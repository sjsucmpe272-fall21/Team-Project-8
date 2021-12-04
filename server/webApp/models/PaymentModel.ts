import uuid from 'uuid';
import * as _ from 'lodash';

import { connection } from '../../Database/Connection';
import { SupplierTypes } from '../../../shared/SupplierTypes';
import { constrcutINClause, jsDateToMySQLDate } from './utlis';

class PaymentModel {

  async getSalesForMachine(machineId: string): Promise<number> {
    const conn = await connection;
    const today = new Date();
    const sales = await conn.query(`
    SELECT sum(price) as sales
    FROM payments
    WHERE machine_id="${machineId}"
    AND (p_time BETWEEN '${jsDateToMySQLDate(
      new Date(new Date().setDate(today.getDate()-30))
    )}' AND '${jsDateToMySQLDate(today)}')
  `);

    return sales[0]?.sales || 0;
  }


  async getPaymentsForMachines(machineIds: string[]): Promise<SupplierTypes.Payment[]> {
    const conn = await connection;
    const today = new Date();

    const payments = await conn.query(`
      SELECT payment_id, price, credit_card_number, p_time, machine_id
      FROM payments 
      WHERE machine_id IN ${constrcutINClause(machineIds)}
      AND (p_time BETWEEN '${jsDateToMySQLDate(
        new Date(new Date().setDate(today.getDate()-30))
      )}' AND '${jsDateToMySQLDate(today)}')
    `);

    const items = await conn.query(`
      SELECT payment_id, product_id, unit_price, quantity
      FROM payment_product
      WHERE payment_id IN ${constrcutINClause(payments.map(({payment_id}: {payment_id: string}) => payment_id))}
    `);

    const itemDetails = await conn.query(`
      SELECT ITEM_ID, ITEM_NAME
      FROM items
      WHERE ITEM_ID IN ${constrcutINClause(Array.from(new Set(items.map(({product_id}: {product_id: string}) => product_id))))}
    `)

    const itemMap = _.keyBy(itemDetails, 'ITEM_ID');
    const paymentItems = _.groupBy(items, ({payment_id}) => payment_id);

    return payments.map((payment: any): SupplierTypes.Payment => {
      const paymentId = payment.payment_id;
      return ({
        paymentId,
        items: paymentItems[paymentId].map((item) => {
          const itemId = item.product_id;
          return ({
            itemId,
            name: itemMap[itemId].ITEM_NAME,
            unitPrice: item.unit_price,
            quantity: item.quantity
          })
        }),
        price: payment.price,
        credit_card_number: payment.credit_card_number,
        timestamp: payment.p_time,
        machineId: payment.machine_id
      })
    });
  }
}




export const paymentModel = new PaymentModel();
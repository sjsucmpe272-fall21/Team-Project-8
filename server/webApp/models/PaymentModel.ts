import uuid from 'uuid';
import * as _ from 'lodash';

import { connection } from '../../Database/Connection';
import { SupplierTypes } from '../../../shared/SupplierTypes';
import { constrcutINClause, jsDateToMySQLDate } from './utlis';

class PaymentModel {
  async getPaymentsForMachines(machineIds: string[]): Promise<SupplierTypes.Payment[]> {
    const conn = await connection;
    const today = new Date();

    const payments = await conn.query(`
      SELECT payment_id, product_id, price, credit_card_number, p_time, machine_id
      FROM payments 
      WHERE machine_id IN ${constrcutINClause(machineIds)}
      AND (p_time BETWEEN '${jsDateToMySQLDate(
        new Date(new Date().setDate(today.getDate()-30))
      )}' AND '${jsDateToMySQLDate(today)}')
    `);

    return payments.map(paymentModelToPayment);
  }
}

const paymentModelToPayment = (payment: any): SupplierTypes.Payment => {
  return ({
    paymentId: payment.payment_id,
    itemId: payment.product_id,
    price: payment.price,
    credit_card_number: payment.credit_card_number,
    timestamp: payment.p_time,
    machineId: payment.machine_id
  })
}




export const paymentModel = new PaymentModel();
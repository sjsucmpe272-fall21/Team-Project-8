import uuid from 'uuid';
import * as _ from 'lodash';


import { connection } from '../../Database/Connection';
import { SupplierTypes } from '../../../shared/SupplierTypes';
import { constrcutINClause } from './utlis';
import { paymentModel } from './PaymentModel';

class MachineModel {
  async getMachinesForUser(userId: string): Promise<SupplierTypes.Machine[]> {
    const conn = await connection;

    const machines = await conn.query(`
      SELECT MACHINE_ID, FLOOR, MACHINE_NUMBER, OWNER_ID
      FROM vending_machines 
      WHERE OWNER_ID="${userId}"
    `);

    const items = await conn.query(`
      SELECT * 
      FROM machine_items mi
      INNER JOIN items i
      ON mi.PRODUCT_ID = i.ITEM_ID
      WHERE M_ID in ${constrcutINClause(machines.map(({ MACHINE_ID }: { MACHINE_ID: string }) => MACHINE_ID))}
    `);

    const payments = await paymentModel.getPaymentsForMachines(
      machines.map(({ MACHINE_ID }: { MACHINE_ID: string}) => MACHINE_ID))

    return aggregateMachines(machines, items, payments);
  }
}


const aggregateMachines = (
  machines: any[],
  items: any[],
  payments: SupplierTypes.Payment[]
): SupplierTypes.Machine[] => {
  const groupedItems = _.groupBy(items, ({ M_ID }) => M_ID);
  const paymentsByMachineId = _.groupBy(payments, ({ machineId }) => machineId);

  return machines.map(({ MACHINE_ID, FLOOR, MACHINE_NUMBER, OWNER_ID }: any): SupplierTypes.Machine => ({
    machineId: MACHINE_ID,
    floor: FLOOR,
    machineNumber: MACHINE_NUMBER,
    ownerId: OWNER_ID,
    items: groupedItems[MACHINE_ID]?.map(({ ITEM_ID, ITEM_NAME, price, QUANTITY, CAPACITY }) => ({
      itemId: ITEM_ID,
      name: ITEM_NAME,
      price,
      quantity: QUANTITY,
      capacity: CAPACITY
    })) || [],
    sales: paymentsByMachineId[MACHINE_ID]?.reduce(
      (prev, payment) => payment.price + prev, 0
    ) || 0
  }));
}




export const machineModel = new MachineModel();
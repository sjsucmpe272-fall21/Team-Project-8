import * as _ from 'lodash';

import { SupplierTypes } from '../../../shared/SupplierTypes';
import { VendingTypes } from '../../../shared/VendingTypes';
import { connection } from '../../database/Connection';
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

  async getMachine(machineId: string): Promise<VendingTypes.Machine | undefined> {
    const conn = await connection;

    const machines = await conn.query(`
      SELECT MACHINE_ID, FLOOR, MACHINE_NUMBER, OWNER_ID
      FROM vending_machines 
      WHERE MACHINE_ID="${machineId}"
    `);

    const machine = machines[0];

    if (!machine) {
      return undefined;
    }

    const items = await conn.query(`
      SELECT * 
      FROM machine_items mi
      INNER JOIN items i
      ON mi.PRODUCT_ID = i.ITEM_ID
      WHERE M_ID="${machineId}"
    `);

    return aggregateVMItems(
      machine, items
    );
  }

  async getAllMachineIds(): Promise<string[]> {
    const conn = await connection;

    const machines = await conn.query(`
      SELECT MACHINE_ID 
      FROM vending_machines
    `);

    return machines.map(({MACHINE_ID}: any) => MACHINE_ID);
  }

  async restockMachine(machineId: string): Promise<SupplierTypes.Machine | undefined> {
    const conn = await connection;

    const sqlQuery = `
      UPDATE machine_items SET QUANTITY=CAPACITY where M_ID='${machineId}'
    `;

    await conn.query(sqlQuery);

    return this.getMachineForSupplier(machineId);
  }

  async getMachineForSupplier(machineId: string): Promise<SupplierTypes.Machine| undefined> {
    const conn = await connection;

    const machine = (await conn.query(`
      SELECT *
      FROM vending_machines 
      WHERE MACHINE_ID="${machineId}"
    `))[0];

    const items = await conn.query(`
      SELECT * 
      FROM machine_items mi
      INNER JOIN items i
      ON mi.PRODUCT_ID = i.ITEM_ID
      WHERE M_ID="${machineId}"
    `);

    const sales = await paymentModel.getSalesForMachine(machineId);

    return {
      machineId: machine.MACHINE_ID,
      floor: machine.FLOOR,
      machineNumber: machine.MACHINE_NUMBER,
      ownerId: machine.OWNER_ID,
      items: items.map(({ ITEM_ID, ITEM_NAME, price, QUANTITY, CAPACITY }: any) => ({
        itemId: ITEM_ID,
        name: ITEM_NAME,
        price,
        quantity: QUANTITY,
        capacity: CAPACITY
      })) || [],
      sales
      };
  }
}

const aggregateVMItems = (
  machine: any,
  items: any[],
): VendingTypes.Machine => {
  const { MACHINE_ID, FLOOR, MACHINE_NUMBER, OWNER_ID } = machine;
  return ({
    machineId: MACHINE_ID,
    floor: FLOOR,
    machineNumber: MACHINE_NUMBER,
    ownerId: OWNER_ID,
    items: items.map(({ ITEM_ID, ITEM_NAME, price, QUANTITY }) => ({
      id: ITEM_ID,
      name: ITEM_NAME,
      price,
      quantity: QUANTITY
    })) || []
  });
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
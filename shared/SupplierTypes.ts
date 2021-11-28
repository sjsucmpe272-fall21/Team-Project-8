export namespace SupplierTypes {
  export interface User {
    email: string;
    name: string;
    id: string;
  }
  export interface Machine {
    machineId: string;
    floor: number;
    machineNumber: number;
    ownerId: string;
    items: (Item & {
      quantity: number;
      capacity: number;
    })[]
  }

  export interface ClimateUpdate {
    climateId: string;
    date: Date;
    time: string;
    prediction: string;
  }

  export interface Item {
    itemId: string;
    name: string;
    price: number;
  }

  export interface Payment {
    paymentId: string;
    itemId: string;
    price: number;
    credit_card_number: string;
    timestamp: Date;
    machineId: string;
  }
}

export const DEFAULT_SALT_ROUNDS = 10;
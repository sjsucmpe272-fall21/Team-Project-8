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
    })[];
    sales: number;
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
    items: {
      itemId: string;
      name: string;
      unitPrice: number;
      quantity: number;
    }[];
    price: number;
    credit_card_number: string;
    timestamp: Date;
    machineId: string;
  }
}

export const DEFAULT_SALT_ROUNDS = 10;
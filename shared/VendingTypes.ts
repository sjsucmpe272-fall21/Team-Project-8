export namespace VendingTypes {
  export interface Item {
    id: string,
    name: string,
    price: number,
    count?: number,
    quantity?: number,
  }

  export interface Machine {
    machineId: string;
    floor: number;
    machineNumber: number;
    ownerId: string;
    items: Item[];
  }

  export interface NearbyMachine {
    floor: number;
    MACHINE_NUMBER: number;
  }
}
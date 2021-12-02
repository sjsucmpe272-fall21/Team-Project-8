export namespace VendingTypes {
  export interface Item {
    id: number,
    name: string,
    price: number,
    count?: number
  }

  export interface Machine {
    machineId: string;
    floor: number;
    machineNumber: number;
    ownerId: string;
    items: (Item & {
      quantity: number;
    })[];
  }
}
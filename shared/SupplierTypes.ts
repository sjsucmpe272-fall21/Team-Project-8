export namespace SupplierTypes {
  export interface User {
    email: string;
    firstName: string;
    lastName: string;
  }
  export interface Something {}
}

export const DEFAULT_SALT_ROUNDS = 10;
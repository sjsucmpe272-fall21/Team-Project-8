import { cloneDeep, omit, findIndex } from 'lodash';

import { SupplierTypes } from "../../../../shared/SupplierTypes";
import { SupplierState } from '../store';



type SupplierAction = {
  type: 'INITIAL_LOAD';
  payload: {
    machines: SupplierTypes.Machine[];
    sales: SupplierTypes.Sales;
  };
} | {
  type: 'DEFAULT_ACTION';
} | {
  type: 'RESTOCK_MACHINE';
  payload: SupplierTypes.Machine;
}

const DEFAULT_STATE: SupplierState = {
  machines: [],
  sales: {
    daily:[],
    items:[],
    transactionSize: []
  }
}

export function machineReducer(state: SupplierState | undefined, action:SupplierAction): SupplierState {
  let newState;

  if (!state) {
    state = DEFAULT_STATE;
  }

  switch (action.type) {
    case 'INITIAL_LOAD':
      newState = {
        ...cloneDeep(action.payload)
      };
      break;
    case 'RESTOCK_MACHINE':
      newState = cloneDeep(state);
      const newMachine = action.payload;
      const machineIndex = findIndex(newState.machines, ({machineId}) => machineId === newMachine.machineId);
      if (machineIndex !== -1) {
        newState.machines[machineIndex] = newMachine;
      }
      break;
    default:
      newState = cloneDeep(DEFAULT_STATE);
  }

  return newState;
}
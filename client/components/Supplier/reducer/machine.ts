import { cloneDeep, omit, findIndex } from 'lodash';

import { SupplierTypes } from "../../../../shared/SupplierTypes";
import { SupplierState } from '../store';



type SupplierAction = {
  type: 'LOAD_USER_MACHINES';
  payload: SupplierTypes.Machine[]
} | {
  type: 'DEFAULT_ACTION';
} | {
  type: 'RESTOCK_MACHINE';
  payload: SupplierTypes.Machine;
}

const DEFAULT_STATE: SupplierState = {
  machines: [],
}

export function machineReducer(state: SupplierState | undefined, action:SupplierAction) {
  let newState;

  if (!state) {
    state = DEFAULT_STATE;
  }

  switch (action.type) {
    case 'LOAD_USER_MACHINES':
      newState = {
        ...state,
        machines: cloneDeep(action.payload)
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
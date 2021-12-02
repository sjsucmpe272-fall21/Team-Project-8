import { cloneDeep } from 'lodash';

import { VendingMachineState } from "../store";

const DEFAULT_VALUE: VendingMachineState = {
  list: [
    { id: 1, name: 'Mars', price: 3.50 },
    { id: 2, name: 'Snickers', price: 3.50 },
    { id: 3, name: 'Twix', price: 4.50 },
    { id: 4, name: 'Bounty', price: 3.50 },
    { id: 5, name: 'Tupla', price: 2.50 },
  ],
  basket: [
    { id: 1, name: 'Mars', price: 3.50, count: 1 },
    { id: 2, name: 'Snickers', price: 3.50, count: 2 },
    { id: 3, name: 'Twix', price: 4.50, count: 1 },
  ],
  modal: false
};

type ItemActions = {
  type: 'SELECT_ITEM' | 'REMOVE_ITEM',
  payload: number;
} | {
  type: 'PAYMENT_START' | 'PAYMENT_CANCEL' | 'PAYMENT_CONFIRM'
} ; 

export function reducer(state: VendingMachineState | undefined, action:ItemActions) {
  let newState: VendingMachineState;
  if (!state) {
    state = DEFAULT_VALUE;
  }

  switch (action.type) {
    case 'SELECT_ITEM':
      newState = cloneDeep(state);

      // Check if item is already in a basket
      let basketIndex = newState.basket.map(function(e: any) { return e.id }).indexOf(action.payload)

      if (basketIndex !== -1) {
        const oldCount = newState.basket[basketIndex].count;
        newState.basket[basketIndex].count = oldCount ? oldCount + 1 : 1;
      } else {
        // Check the index of an item
        let listIndex = newState.list.map(function(e: any) { return e.id }).indexOf(action.payload)
        newState.basket.push({ ...newState.list[listIndex], count: 1 })
      }
      break

    case 'REMOVE_ITEM':
      newState = cloneDeep(state);
      let index = newState.basket.map(function(e: any) { return e.id }).indexOf(action.payload)
      newState.basket.splice(index, 1)
      break

    case 'PAYMENT_START':
      newState = { ...state, modal: true }
      break

    case 'PAYMENT_CANCEL':
      newState = { ...state, modal: false }
      break

    case 'PAYMENT_CONFIRM':
      newState = { ...state, basket: [], modal: false }
      break

    default:
      let history;
      if (typeof window !== 'undefined') {
        history = localStorage.getItem('items');
      }


      newState = (history == null) ? DEFAULT_VALUE : { ...DEFAULT_VALUE, ...JSON.parse(history) }
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('items', JSON.stringify(newState))
  }

  return newState
}
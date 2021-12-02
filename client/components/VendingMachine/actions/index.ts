import { store } from '../store';
const { dispatch } = store

export function selectItem(itemId: number) {
  dispatch({ type: 'SELECT_ITEM', payload: itemId })
}

export function removeItem(itemId: number) {
  dispatch({ type: 'REMOVE_ITEM', payload: itemId })
}

export { pay, confirmPayment, cancelPayment } from './payment'; 
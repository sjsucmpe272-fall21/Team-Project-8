import axios from 'axios';

import { store, VendingMachineState } from '../store';

const { dispatch } = store

export function pay() {
  dispatch({ type: 'PAYMENT_START' })
}

interface PaymentTransaction {
  machineId: string;
  basket: VendingMachineState['basket'];
  name: string;
  cardNumber: string;
}
export async function confirmPayment(transaction: PaymentTransaction) {
  console.log("Confirm Payment Reducer", transaction);
  const result = await axios.post('/vm/quantityCheckandUpdation', transaction);

  console.log("Confirm result: ", result);
  dispatch({ type: 'PAYMENT_CONFIRM' })
}

export function cancelPayment() {
  dispatch({ type: 'PAYMENT_CANCEL' })
}
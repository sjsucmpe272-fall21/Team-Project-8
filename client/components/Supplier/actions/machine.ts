import axios from 'axios';

import { store } from '../store';

const { dispatch } = store

export async function initialLoad() {
  const machine = await axios.get('/wa/machines');
  dispatch({type: 'LOAD_USER_MACHINES', payload: machine.data})
}

export async function restockAllItems(machineId: string) {
  const result = await axios.post('/wa/machine/restock', {
    machineId
  });

  dispatch({type: 'RESTOCK_MACHINE', payload: result.data})
}
import * as React from 'react';
import { VendingTypes } from '../../../../shared/VendingTypes';
import { VendingMachineState } from '../store';

import './VendingMachineDisplay.scss';

interface Props {
  nearby: VendingMachineState['nearby'];
}



export const VendingMachineDisplay: React.FC<Props> = ({nearby}) => {
  return !nearby ? null : (
    <>
      <h4>Nearby info for: {nearby.product.name}</h4>
      <table className="vending-machine-display-table">
        <thead>
          <tr >
            <td>Floor</td>
            <td>Machine Number</td>
          </tr>
        </thead>
        <tbody>
          {nearby.machines.map(({MACHINE_NUMBER, floor}) => (
            <tr key={`${MACHINE_NUMBER}${floor}`}>
              <td>
                {floor}
              </td>
              <td>
                {MACHINE_NUMBER}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}




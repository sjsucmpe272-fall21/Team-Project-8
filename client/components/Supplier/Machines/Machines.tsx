import * as React from 'react';
import axios from 'axios';
import { css } from "@emotion/react";
import { ClimbingBoxLoader } from 'react-spinners';

import { SupplierTypes } from '../../../../shared/SupplierTypes';


const SPINNER_STYLE = css`
  position: unset;
`

export const Machines: React.FC = () => {
  const [machines, setMachines] = React.useState<SupplierTypes.Machine[]>([]);
  
  console.log("Initializing Machines");

  React.useEffect(() => {
    async function fetchMachines() {
      console.log("Fetch Machine");
      const fetchResults = await axios.get('/wa/machines');
      setMachines(fetchResults.data);
      console.log(fetchResults.data);
    }
    if (machines.length === 0) {
      fetchMachines();
    }
  }, [])

  return machines.length === 0 ? (
    <ClimbingBoxLoader css={SPINNER_STYLE} color="#20b2aa"/>
  ):(
    <div>
      <h2>Welcome to the Machine Page!</h2>
      {machines.map(MachineLine)}
    </div>
  )
}

const MachineLine = (machine: SupplierTypes.Machine) => {
  return (
    <div key={machine.machineId}>
      {JSON.stringify(machine)}
    </div>
  )
}
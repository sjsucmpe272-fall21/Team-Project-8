import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import { ClimbingBoxLoader } from 'react-spinners';

const SPINNER_STYLE = css`
  position: unset;
`



export const VendingMachineList: React.FC = () => {
  const [machineIds, setMachineIdes] = React.useState<string[] | undefined>(undefined);

  React.useEffect(() => {
    const fetchAllIds = async () => {
      if (machineIds === undefined) {
        const response = await axios.get('/vm/all');
  
        console.log(response.data);
        setMachineIdes(response.data);
      }
    }
    fetchAllIds();
  }, []);


  return machineIds === undefined? (
    <ClimbingBoxLoader css={SPINNER_STYLE} color="#20b2aa"/>
  ) : (
    <div>
      {machineIds.map((machineId) => (
        <div  key={machineId}>
          <Link to={`/vending/${machineId}`}>{machineId}</Link>
        </div>
      ))}
    </div>
  )
}
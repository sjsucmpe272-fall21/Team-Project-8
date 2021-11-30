import * as React from 'react';
import axios from 'axios';
import { css } from "@emotion/react";
import { ClimbingBoxLoader } from 'react-spinners';
import DataTable, { TableColumn } from 'react-data-table-component';
import _ from 'lodash';

import { SupplierTypes } from '../../../../shared/SupplierTypes';
import { ExportButton, downloadCSV } from './ExportButton';
import { MachineDetails } from './MachineDetails';
import './Machines.scss';

const SPINNER_STYLE = css`
  position: unset;
`

export type TableMachine = Pick<SupplierTypes.Machine, 'floor' | 'machineNumber' | 'sales'>  &
{
  stockLevel: string;
}

const columns: TableColumn<SupplierTypes.Machine>[] = [
  {
    name: 'Floor',
    selector: row => row.floor,
    sortable: true
  },
  {
    name: 'Machine Number',
    selector: row => row.machineNumber
  },
  {
    name: 'Stock Level %',
    selector: row => getStockLevel(row.items),
    sortable: true
  },
  {
    name: 'Sales (last 30 days) $',
    selector: row => row.sales,
    sortable: true
  }
]

export const Machines: React.FC = () => {
  const [machines, setMachines] = React.useState<SupplierTypes.Machine[]>([]);
  const tableMachines = React.useMemo<TableMachine[]>(
    () => machinesToTable(machines), [machines]);
  const actionsMemo = React.useMemo(() => 
    <ExportButton onExport={() => downloadCSV(tableMachines)} />, [tableMachines]);


  React.useEffect(() => {
    async function fetchMachines() {
      const fetchResults = await axios.get('/wa/machines');
      setMachines(fetchResults.data);
    }
    if (machines.length === 0) {
      fetchMachines();
    }
  }, [])

  return machines.length === 0 ? (
    <ClimbingBoxLoader css={SPINNER_STYLE} color="#20b2aa"/>
  ):(
    <div>
      <h2>Machines</h2>
      <DataTable
        columns={columns}
        data={machines}
        actions={actionsMemo}
        expandableRows={true}
        expandableRowsComponent={MachineDetails}
        pagination
      />
    </div>
  )
}

function machinesToTable(machines: SupplierTypes.Machine[]): TableMachine[] {
  return machines.map(({floor, machineNumber, sales, items}): TableMachine => ({
    floor,
    machineNumber,
    sales, 
    stockLevel: getStockLevel(items)
  }));
}

function getStockLevel(items: SupplierTypes.Machine['items']): string {
  return ((_.sumBy(items, ({quantity}) => quantity) /_.sumBy(items, ({capacity}) => capacity))*100  || 0).toFixed(2);
}
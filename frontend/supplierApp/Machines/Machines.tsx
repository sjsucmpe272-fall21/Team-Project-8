import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { css } from "@emotion/react";
import { ClimbingBoxLoader } from 'react-spinners';
import DataTable, { TableColumn } from 'react-data-table-component';
import _ from 'lodash';

import { SupplierTypes } from '../../../shared/SupplierTypes';
import { ExportButton, downloadCSV, getStockLevel } from './ExportButton';
import { MachineDetails } from './MachineDetails';

import './Machines.scss';

const SPINNER_STYLE = css`
  position: unset;
`

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
  const machines = useSelector<any, any>(({ machines }) => machines.machines);
  return (<ErrorBoundary>
    {!machines || machines.length === 0 ? (
      <ClimbingBoxLoader css={SPINNER_STYLE} color="#20b2aa" />
    ) : (
      <div>
        <h2>Machines</h2>
        <DataTable
          columns={columns}
          data={machines}
          actions={(<ExportButton onExport={() => downloadCSV(machines)} />)}
          expandableRows={true}
          expandableRowsComponent={MachineDetails}
          pagination
        />
      </div>
    )}
  </ErrorBoundary>);
}

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
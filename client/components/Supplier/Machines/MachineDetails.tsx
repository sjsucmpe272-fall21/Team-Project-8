import * as React from 'react';
import { Button } from 'reactstrap';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

import { SupplierTypes } from '../../../../shared/SupplierTypes';
import { restockAllItems } from '../actions/machine';


interface Props {
  data: SupplierTypes.Machine;
}



export const MachineDetails: React.FC<Props> = ({data}) => {
  return (
    <div className="machine-details">
      <ResponsiveContainer width="100%" height="100%">
        <>
        <BarChart
          width={500}
          height={300}
          data={itemsToChart(data.items)}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Stock" stackId="a" fill="#8884d8" />
          <Bar dataKey="Empty Spot" stackId="a" fill="#82ca9d" />
        </BarChart>
        <Button onClick={() => restockAllItems(data.machineId)}>
            Restock all items
        </Button>
        </>
      </ResponsiveContainer>
    </div>
  )
}

const itemsToChart = (items: SupplierTypes.Machine['items']) => {
  return items.map(({name, capacity, quantity}) => ({
    name,
    Stock: quantity,
    "Empty Spot": capacity-quantity
  }))
}
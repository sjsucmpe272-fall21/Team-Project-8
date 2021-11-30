import * as React from 'react';
import { 
  BarChart, 
  Bar, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

import { SupplierTypes } from '../../../../shared/SupplierTypes';


interface Props {
  data: SupplierTypes.Machine;
}



export const MachineDetails: React.FC<Props> = ({data}) => {
  return (
    <pre className="machine-details">
      awejrpaoewrjrao
      <ResponsiveContainer width="100%" height="100%">
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
      </ResponsiveContainer>
    </pre>
  )
}

const itemsToChart = (items: SupplierTypes.Machine['items']) => {
  return items.map(({name, capacity, quantity}) => ({
    name,
    Stock: quantity,
    "Empty Spot": capacity-quantity
  }))
}
import * as React from 'react';
import {
  AreaChart, 
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import * as _ from 'lodash';

import { SupplierTypes } from '../../../shared/SupplierTypes';

import './SalesChart.scss';


interface Props {
  daily: SupplierTypes.Sales['daily'];
}




export const TotalSalesChart: React.FC<Props> = ({ daily }) => {
  const transformedDaily: any[] = _.sortBy(daily.map((daily) => ({
    date: daily.date,
    total: daily.machines.reduce((prev, machine) => prev + machine.sales,0)
  })), ({ date }) => new Date(date));




  return (
    <div className="machine-daily-sales">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={transformedDaily}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend formatter={() => 'Total Sales'}/>
          <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const generateRandomColorCode = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

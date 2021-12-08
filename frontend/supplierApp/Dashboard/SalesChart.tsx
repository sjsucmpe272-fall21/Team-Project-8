import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import * as _ from 'lodash';
import { useSelector } from 'react-redux';

import { SupplierTypes } from '../../../shared/SupplierTypes';

import './SalesChart.scss';


interface Props {
  daily: SupplierTypes.Sales['daily'];
}




export const SalesChart: React.FC<Props> = ({ daily }) => {
  const machines = useSelector<any, SupplierTypes.Machine[]>(({ machines }) => machines.machines);

  const transformedDaily: any[] = _.sortBy(daily.map((daily) => ({
    date: daily.date,
    ...Object.fromEntries(daily.machines.map((machine) => [machine.machineId, machine.sales]))
  })), ({date}) => new Date(date));


  
  const allMachineKeys = 
    Object.fromEntries(Array.from(
      new Set(
        daily.flatMap(({machines}) => machines.map(({machineId}) => machineId)
        )
      )
    ).map((key) => {
      const m = machines.find(({machineId})=> machineId === key);
      if (!m) {
        throw new Error("Oh no");
      }
      const { machineId, floor, machineNumber}  =m;

      return [
        machineId,
        `(${floor}, ${machineNumber})`
      ]
    }));





  return (
    <div className="machine-daily-sales">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Legend formatter={(key) => allMachineKeys[key]}/>
          {Object.entries(allMachineKeys).map(([machineId, name]) => (
            <Line 
              key={machineId} 
              type="monotone" 
              name={name}
              dataKey={machineId} 
              stroke={`#${generateRandomColorCode()}`} 
              strokeWidth={2}
            />
          ))
          }
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const generateRandomColorCode = () =>  Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');

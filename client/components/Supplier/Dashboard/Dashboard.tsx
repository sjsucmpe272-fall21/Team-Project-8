import * as React from 'react';
import { useSelector } from 'react-redux';

import { SalesChart } from './SalesChart';
import { TotalSalesChart } from './TotalSalesChart';

import './Dashboard.scss';
import { SalesByItemChart } from './SalesByItemChart';
import { TransactionSizeChart } from './TransactionSizeChart';

export const Dashboard: React.FC = () => {
  const sales = useSelector<any, any>(({ machines }) => machines.sales);

  console.log(sales);
  
  return sales ? (
    <>
      <h2>Welcome to Vendiman!</h2>
      <div className="dashboard-charts">
        <div className="chart-row">
          <TotalSalesChart daily={sales.daily}/>
          <SalesChart daily={sales.daily}/>
        </div>
        <div className="chart-row">
          <SalesByItemChart items={sales.items}/>
          <TransactionSizeChart transactions={sales.transactionSize}/>
        </div>
      </div>
    </>
  ) : (<h2>Welcome to Vendiman!</h2>)
}
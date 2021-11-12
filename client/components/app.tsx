import React from 'react'
import { Route, Link } from 'react-router-dom'

import { Supplier } from './Supplier/Supplier'
import { VendingMachine  } from './VendingMachine/VendingMachine'
import {Dashboard} from './SupplierDashboard/Dashboard'

export const App: React.FC = () => (
    <div>
      Some helpful links here. Should be removed/modified later
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/vending'>Vending Machine</Link>
        </li>
        <li>
          <Link to='/supplier'>Supplier Login Page</Link>
        </li>
        <li>
          <Link to='/dashboard'>Supplier Dashboard</Link>
        </li>
      </ul>
      <Route exact path='/'>
        <div>
          <h1>
            Home page for Vendiman
          </h1>
        </div>
      </Route>
      <Route path='/vending'>
        <VendingMachine/>
      </Route>
      <Route path='/supplier'>
        <Supplier/>
      </Route>
      <Route path='/dashboard'>
        <Dashboard/>
      </Route>
    </div>
)
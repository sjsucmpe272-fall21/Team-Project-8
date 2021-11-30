import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'

import { Supplier } from './Supplier/Supplier'
import { VendingMachine  } from './VendingMachine/VendingMachine'
import { AuthConsumer, AuthProvider } from './Supplier/AuthContext'
import { NavBar } from './Supplier/NavBar'

export const App: React.FC = () => {
  const { authed } = AuthConsumer();
  return (
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
        { authed && (
          <>
            <li>
              <Link to='/supplier/logout'>Supplier Logout</Link>
            </li>
            <li>
              <Link to='/dashboard'>Supplier Dashboard</Link>
            </li>
          </>
        )}
      </ul>
      <AuthProvider>
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
        <Route exact={true} path='/supplier'>
          <Supplier/>
        </Route>
        <Route exact={true} path='/dashboard'>
          {/* <RequireAuth> */}
            <NavBar/>
          {/* </RequireAuth> */}
        </Route>
      </AuthProvider>
    </div>
);}

const RequireAuth: React.FC<{}> = ({children}) => {
  const { authed } = AuthConsumer();
  return authed === true 
    ? (<>{children}</>)
    : <Redirect to='/supplier'/>
}
import * as React from 'react';

import { AuthConsumer } from './AuthContext';
import { Dashboard } from './Dashboard/Dashboard';

import './NavBar.scss';




type NavItem = 'Dashboard' | 'Machines' | 'Stocks' | 'Predictions'



export const NavBar: React.FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<NavItem>('Dashboard');
  const { logout } = AuthConsumer();

  return (
    <div className='main-component'>
      <div className='navigation-sidebar'>
        <div>
          <button className='navigation-item' onClick={() => setSelectedItem('Dashboard')}>Dashboard</button>
          <button className='navigation-item' onClick={() => setSelectedItem('Machines')}>Machines</button>
          <button className='navigation-item' onClick={() => setSelectedItem('Stocks')}>Stocks</button>
          <button className='navigation-item' onClick={() => setSelectedItem('Predictions')}>Predictions</button>
        </div>
        <button onClick={logout}>Log out</button>
      </div>
      <div className='main-page'>
        {renderComponent(selectedItem)}
      </div>
    </div>
  );
}

const renderComponent = (type: NavItem) => {
  switch (type) {
    case 'Dashboard':
      return <Dashboard/>;
    case 'Machines':
    case 'Stocks':
    case 'Predictions':
      return <div>Not implemented</div>
    default: 
      "Wrong nav item type";
  }
}
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AuthConsumer } from './AuthContext';
import { Dashboard } from './Dashboard/Dashboard';
import { Machines } from './Machines/Machines';

import './NavBar.scss';


type NavItem = 'Dashboard' | 'Machines' | 'Stocks' | 'Predictions';

interface Props {
  selectedItem: NavItem;
}  



export const NavBar: React.FC<Props> = ({selectedItem}) => {
  const { logout } = AuthConsumer();

  return (
    <div className='main-component'>
      <div className='navigation-sidebar'>
        <div className='navigation-links'>
          <Link className='navigation-item' to='/dashboard'>Dashboard</Link>
          <Link className='navigation-item' to='/machines'>Machines</Link>
          <Link className='navigation-item' to='/predictions'>Predictions</Link>
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
      return <Machines/>;
    case 'Stocks':
    case 'Predictions':
      return <div>Not implemented</div>
    default: 
      "Wrong nav item type";
  }
}
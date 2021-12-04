import * as React from 'react';
import { Provider } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { initialLoad } from './actions/machine';

import { AuthConsumer } from './AuthContext';
import { Dashboard } from './Dashboard/Dashboard';
import { Machines } from './Machines/Machines';

import './NavBar.scss';
import { store } from './store';


type NavItem = 'dashboard' | 'machines' | 'stocks' | 'predictions';

interface Props {
}  
 


export const NavBar: React.FC<Props> = ({}) => {

  const { logout } = AuthConsumer();
  const { page } = useParams<{page:NavItem}>();
  initialLoad();

  return (
    <Provider store={store}>
      <div className='main-component'>
        <div className='navigation-sidebar'>
          <div className='navigation-links'>
            <Link className='navigation-item' to='/supplier/dashboard'>Dashboard</Link>
            <Link className='navigation-item' to='/supplier/machines'>Machines</Link>
          </div>
          <button onClick={logout}>Log out</button>
        </div>
        <div className='main-page'>
          {renderComponent(page)}
        </div>
      </div>
    </Provider>
  );
}

const renderComponent = (type: NavItem) => {
  switch (type) {
    case 'dashboard':
      return <Dashboard/>;
    case 'machines':
      return <Machines/>;
    case 'stocks':
    case 'predictions':
      return <div>Not implemented</div>
    default: 
      "Wrong nav item type";
  }
}
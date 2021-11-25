import _ from 'lodash';
import * as React from 'react';
import { Redirect } from 'react-router';

import { AuthConsumer } from './AuthContext';
import { SupplierLoginForm } from './LoginForm/SupplierLoginForm';
import { SupplierSignUpForm } from './SignUpForm/SupplierSignUpForm'

import './Supplier.scss';

export const Supplier: React.FC = () => {
  const { authed } = AuthConsumer();

  const [signUp, setSignUp] = React.useState(false);
  return authed ? (
    <Redirect to='/dashboard'/>
  ) : (
    <>
      <h1>Supplier Page</h1>
      <div className="supplier-title">
        { signUp ? 
          (<SupplierSignUpForm toLogin={() => setSignUp(false)}/>) :
          (<SupplierLoginForm toSignUp={() => setSignUp(true)} />)
        }
      </div>
    </>
  );
}
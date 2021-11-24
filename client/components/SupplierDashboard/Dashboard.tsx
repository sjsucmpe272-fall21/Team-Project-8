import React, { useState } from 'react';
import { AuthConsumer } from '../Supplier/AuthContext';

import '../Supplier/Supplier';

export const Dashboard: React.FC = () => {
  const { logout } = AuthConsumer();
  
  return (
    <div>
      <h2>Welcome to the Dashboard!</h2>
      <button onClick={logout}>Log out</button>
    </div>
  )
}
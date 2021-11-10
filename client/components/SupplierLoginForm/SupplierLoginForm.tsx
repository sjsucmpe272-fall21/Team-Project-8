import React, { useState } from 'react';

import './supplierloginform.scss';

export const SupplierLoginForm: React.FC<{login: (detail: any) => void}> = ({login}) => {

  const [details, setDetails] = useState({ name: "", email: "", password: "" });

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        login(details);
        
    }
    

  return (
    <>
      <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {/* ERROR */}
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <input type="submit" value="Login" />
            </div>
        </form>
    </>
  );
}
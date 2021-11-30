import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


import { LoginInfo, AuthConsumer as useAuth } from '../AuthContext';
import '../Supplier.scss';

interface Props {
  toSignUp: () => void;
}

export const SupplierLoginForm: React.FC<Props> = ({toSignUp}) => {
  const [details, setDetails] = useState<LoginInfo>({email: '', password: ''});
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { login } = useAuth();

  const Login = React.useCallback(async (e:any ) => {
    e.preventDefault();
    console.log(details);
    const { email, password } = details;

    if (email.length == 0) {
      setError('Email is required');
      return;
    } else if (password.length == 0) {
      setError('Password is required');
      return;
    } else {
      setError('');
    }
    const authResult = await login(details);
    console.log("Auth Result: ", authResult)
    if (authResult) {
      setRedirect(true);
    } else {
      setError("Incorrect email or password");
    }
  },
    [details, login]
  );


  return redirect ? (
    <Redirect to='/supplier/dashboard'/>
  ) : (
    <form onSubmit={Login} className="login-signup-form">
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group inputStyle">
          <label htmlFor="email">Email: </label>
          <input 
            type="text" 
            name="email" 
            id="email" 
            autoFocus={true}
            onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
        </div>
        <div className="form-group inputStyle">
          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
        </div>
        {(error != "") ? (<div className="login-error">{error}</div>) : ""}
        <input type="submit" value="Login"/>
        <input type="button" value="Sign Up" onClick={toSignUp}/>
      </div>
    </form>
  );
}
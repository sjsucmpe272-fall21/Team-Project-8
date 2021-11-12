import React, {useState} from 'react';
import { SupplierLoginForm } from '../SupplierLoginForm/SupplierLoginForm';

import './Supplier.scss';

export const Supplier: React.FC = () => {
  const adminUser = {
    email: "admin@ad.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name: "", email:""});
  const [error, setError] = useState("");

  const Login = (details: any) => {
    console.log(details);

    if(details.email == adminUser.email && details.password == adminUser.password){
      console.log("Logged In");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("Details do not match");
      setError("Details do not match!");
    }
  }
  
  const Logout = () => {
    console.log("Logout");
    setUser({
      name: "",
      email: ""
    });
  }
  
  return (
    <>
      <h1>Supplier Page</h1>
      <div className="supplier-title">
          {(user.email != "") ? (
          <div className="welcome">
            <h2>Welcome, <span>{user.name}</span></h2>
            <button onClick={Logout}>Logout</button>
          </div>
        ) : (
            <div><SupplierLoginForm login={Login} error={error} />
            </div>
          )}
      </div>
    </>
  );
}
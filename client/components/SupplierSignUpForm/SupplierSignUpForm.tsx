import React, { useState } from 'react';

import '../SupplierLoginForm/SupplierLoginForm.scss';

export const SupplierSignUpForm: React.FC <{SignUp: (detail: any) => void, error: any}> = ({SignUp,error}) => {

  const [details, setDetails] = useState ({ name: "", email: "", password: "",confirm_password: "" });

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        SignUp(details);
        
    }
    

  return (
    <>
      <div className="formStyle">
        <form onSubmit={submitHandler}>
              <div className="form-inner">
                  <h2>SignUp</h2>
                  {(error != "") ? ( <div className="error">{error}</div>) : ""}
                  <div className="form-group inputStyle">
                      <label htmlFor="name">Name: </label>
                      <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
                  </div>
                  <div className="form-group inputStyle">
                      <label htmlFor="email">Email: </label>
                      <input type="text" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}  />
                  </div>
                  <div className="form-group inputStyle">
                      <label htmlFor="password">Password: </label>
                      <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}  />
                  </div>
                  <div className="form-group inputStyle">
                      <label htmlFor="password">Confirm Password: </label>
                      <input type="password" name="confirm_password" id="confirm_password" onChange={e => setDetails({...details, confirm_password: e.target.value})} value={details.confirm_password}  />
                  </div>
                  <input type="submit" value="Sign Up" />
              </div>
        </form>
      </div>
    </>
  );
}
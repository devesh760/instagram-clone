import React from "react";
import Logo from '../../UI/Logo'
function Login() {
  return (
    <div className="sign-up-wrapper">
      <div className="sign-up">
        <div className="logo">
          <Logo height="90px" width="175px" />
        </div>
        <p>Sign up to see photos and videos from your friends.</p>
      </div>
      <div className="login"></div>
    </div>
  );
}

export default Login;

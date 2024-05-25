import "./SignUpLogin.scss";
import { useState } from "react";
import {Box, Grid} from "@mui/material";

const SignUpLogin = () => {
  const [ signUpOrLogin, setSignUpOrLogin ] = useState('login');
  const [errorMessage, setErrorMessage] = useState('');
  
  const submitForm = (event: any) => {
    event.preventDefault();
    console.log(signUpOrLogin, event.target.elements.email.value);
    if (signUpOrLogin === 'login') {
      if (event.target.elements.password.value.length < 6) {
        setErrorMessage('Password must have at least 6 characters.');
        return;
      }
    }
  };

  return (
    <Grid container className="register-login" direction="column" alignItems="center" marginTop={10}>
      {
      signUpOrLogin === 'login'
      ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <h2>Login</h2>
          <form action="/users" method="GET" className="form" onSubmit={submitForm}>
            <input type="text" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <Box className="form-switch">
            <p>Don't have an account?</p>
            <button onClick={() => setSignUpOrLogin('singUp')}>
              Sign Up
            </button>
          </Box>
        </Box>
        )
      : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2>Sign Up</h2>
            <form action="/users" method="POST" className="form" onSubmit={submitForm}>
              <input type="text" name="email" placeholder="Email" />
              <input type="text" name="username" placeholder="Username" />
              <input type="password" name="password" placeholder="Password" />
              <input type="password" name="repeatPassword" placeholder="Repeat password" />
              <button type="submit">Sign Up</button>
            </form>
            
            <Box className="form-switch">
              <p>Already have an account?</p>
              <button onClick={() => setSignUpOrLogin('login')}>
                Login
              </button>
            </Box>
          </Box>
        )
      }

      {
        errorMessage
        ? <Box className="error-message">
          <p>
            {errorMessage}
          </p>
        </Box>
        : null
      }
    </Grid>
  );
}

export default SignUpLogin;
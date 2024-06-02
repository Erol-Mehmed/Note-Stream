import "./SignUpLogin.scss";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import api from "../services/api.ts";
import { useNavigate } from "react-router-dom";

const SignUpLogin = () => {
  const [ signUpOrLogin, setSignUpOrLogin ] = useState('login');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  
  const [loginEmail , setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [loginEmailError, setLoginEmailError] = useState('');
  const [loginPasswordError, setLoginPasswordError] = useState('');
  const [signUpEmailError, setSignUpEmailError] = useState('');
  const [signUpUsernameError, setSignUpUsernameError] = useState('');
  const [signUpPasswordError, setSignUpPasswordError] = useState('');
  const [signUpConfirmPasswordError, setSignUpConfirmPasswordError] = useState('');
  
  const routeNavigate = useNavigate();

  useEffect(() => {
    console.log('Component has mounted');
    // You can perform any data fetching or setup here

    return () => {
      // This is the cleanup function that gets called when the component unmounts
      console.log('Component will unmount');
    };
  }, []); // The empty array means this effect runs once on mount and cleanup on unmount

  const formSwitch = () => {
    setErrorMessages([]);
    setSignUpOrLogin(signUpOrLogin === 'login' ? 'singUp' : 'login');

    const currentRoute = signUpOrLogin === 'login' ? '/register' : '/login';
    routeNavigate(currentRoute);
  };

  const submit = async (event: any) => {
    event.preventDefault();

    setErrorMessages([]);
    setLoginEmailError('');
    setLoginPasswordError('');
    setSignUpEmailError('');
    setSignUpUsernameError('');
    setSignUpPasswordError('');
    setSignUpConfirmPasswordError('');
    
    let validationError = false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (signUpOrLogin === 'login') {
      if (!emailRegex.test(loginEmail)) {
        setLoginEmailError('error');
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Invalid email format.']);
        validationError = true;
      }
      
      if (loginPassword.length < 6) {
        setLoginPasswordError('error');
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Password must have at least 6 characters.']);
        validationError = true;
      }
      
      if (validationError) {
        return;
      }
      
      const response = await api.post('/users/login', {
        email: loginEmail,
        password: loginPassword
      });

      if (response.data.error === 'Invalid email or password') {
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Invalid email or password']);
      } else {
        console.log(response, document.cookie);
        
      }
    } else {
      const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
      
      if (!emailRegex.test(signupEmail)) {
        setSignUpEmailError('error');
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Invalid email format.']);
        validationError = true;
      }
      
      if (!usernameRegex.test(signupUsername)) {
        setSignUpUsernameError('error');
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Username must have at least 3 characters.']);
        validationError = true;
      }
      
      if (signupPassword.length < 6) {
        setSignUpPasswordError('error');
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Password must have at least 6 characters.']);
        validationError = true;
      }

      if (signupPassword !== signupConfirmPassword) {
        setSignUpConfirmPasswordError('error');
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Passwords do not match.']);
        validationError = true;
      }
      
      if (validationError) {
        return;
      }

      await api.post('/users/register', {
        email: signupEmail,
        username: signupUsername,
        password: signupPassword
      });
    }
  };

  return (
    <Grid container className="register-login" direction="column" alignItems="center" marginTop={10}>
      {
      signUpOrLogin === 'login'
      ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <h2>Login</h2>
          <form className="form" onSubmit={submit}>
            <input type="text" name="email" placeholder="Email" className={loginEmailError} value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" className={loginPasswordError} value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>
          <Box className="form-switch">
            <p>Don't have an account?</p>
            <button onClick={formSwitch}>
              Sign Up
            </button>
          </Box>
        </Box>
        )
      : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <h2>Sign Up</h2>
            <form className="form" onSubmit={submit}>
              <input type="text" name="email" placeholder="Email" className={signUpEmailError} value={signupEmail}
                 onChange={(e) => setSignupEmail(e.target.value)} />
              <input type="text" name="username" placeholder="Username" className={signUpUsernameError} value={signupUsername}
                 onChange={(e) => setSignupUsername(e.target.value)} />
              <input type="password" name="password" placeholder="Password" className={signUpPasswordError} value={signupPassword}
                 onChange={(e) => setSignupPassword(e.target.value)} />
              <input type="password" name="confirmPassword" placeholder="Confirm password" className={signUpConfirmPasswordError} value={signupConfirmPassword}
                 onChange={(e) => setSignupConfirmPassword(e.target.value)} />
              <button type="submit">Sign Up</button>
            </form>

            <Box className="form-switch">
              <p>Already have an account?</p>
              <button onClick={formSwitch}>
                Login
              </button>
            </Box>
          </Box>   
        )
      }

      {
        errorMessages.length > 0
        ? <Box className="error-message">
            {errorMessages.map((errorMessage, index) => (
              <p key={index}>
                {
                  errorMessages.length === 1
                  ? errorMessage
                  : `${index + 1}. ${errorMessage}`
                }
              </p>
            ))}
        </Box>
        : null
      }
    </Grid>
  );
}

export default SignUpLogin;

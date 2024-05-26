import "./SignUpLogin.scss";
import { useState } from "react";
import { Box, Grid } from "@mui/material";

const SignUpLogin = () => {
  const [ signUpOrLogin, setSignUpOrLogin ] = useState('login');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  
  const [loginEmail , setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupEmail, setSignupEmail] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const [errorState, setErrorState] = useState({
    loginEmailError: '',
    loginPasswordError: '',
    signUpEmailError: '',
    signUpUsernameError: '',
    signUpPasswordError: '',
    signUpConfirmPasswordError: ''
  });
  
  const formSwitch = () => {
    setErrorMessages([]);
    setSignUpOrLogin(signUpOrLogin === 'login' ? 'singUp' : 'login');
  };

  const submitForm = (event: any) => {
    event.preventDefault();
    
    setErrorMessages([]);
    setErrorState({
      loginEmailError: '',
      loginPasswordError: '',
      signUpEmailError: '',
      signUpUsernameError: '',
      signUpPasswordError: '',
      signUpConfirmPasswordError: ''
    });
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (signUpOrLogin === 'login') {
      if (!emailRegex.test(loginEmail)) {
          setErrorState({ ...errorState, loginEmailError: 'error' });
        console.log('email:', errorState);
          setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Invalid email format.']);
      }
      
      if (loginPassword.length < 6) {
        setErrorState({ ...errorState, loginPasswordError: 'error' });
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Password must have at least 6 characters.']);
      }
      console.log(errorState);
    } else {
      const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
      
      if (!emailRegex.test(signupEmail)) {
        setErrorState({ ...errorState, signUpEmailError: 'error' });
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Invalid email format.']);
      }
      
      if (!usernameRegex.test(signupUsername)) {
        setErrorState({ ...errorState, signUpUsernameError: 'error' });
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Username must have at least 3 characters.']);
      }
      
      if (signupPassword.length < 6) {
        setErrorState({ ...errorState, signUpPasswordError: 'error' });
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Password must have at least 6 characters.']);
      }

      if (signupPassword !== signupConfirmPassword) {
        setErrorState({ ...errorState, signUpConfirmPasswordError: 'error' });
        setErrorMessages(previousErrorMessages => [...previousErrorMessages, 'Passwords do not match.']);
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
          <form method="GET" className="form" onSubmit={submitForm}>
            <input type="text" name="email" placeholder="Email" className={errorState.loginEmailError} value={loginEmail} 
              onChange={(e) => setLoginEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Password" className={errorState.loginPasswordError} value={loginPassword}
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
            <form method="POST" className="form" onSubmit={submitForm}>
              <input type="text" name="email" placeholder="Email" className={errorState.signUpEmailError} value={signupEmail}
                 onChange={(e) => setSignupEmail(e.target.value)} />
              <input type="text" name="username" placeholder="Username" className={errorState.signUpUsernameError} value={signupUsername}
                 onChange={(e) => setSignupUsername(e.target.value)} />
              <input type="password" name="password" placeholder="Password" className={errorState.signUpPasswordError} value={signupPassword}
                 onChange={(e) => setSignupPassword(e.target.value)} />
              <input type="password" name="confirmPassword" placeholder="Confirm password" className={errorState.signUpConfirmPasswordError} value={signupConfirmPassword}
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

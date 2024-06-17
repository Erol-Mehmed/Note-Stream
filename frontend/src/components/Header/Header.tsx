import { Grid } from '@mui/material';
import './Header.scss';
import iconNote from '../../assets/icon-note.svg';
import useAuth from '../../hooks/useAuth.ts';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  
  return (
    <Grid container className="header" alignItems="center" fontStyle="italic">
      <Grid item xs={4} className="name-icon" display="flex" alignItems="center">
        <img src={iconNote} alt="Note Stream Logo" />
        <h1>Note Stream</h1>
      </Grid>
      <Grid item xs={4} display="flex" justifyContent="center">
        <p className="slogan">
          Where Your Ideas Flow Freely
        </p>
      </Grid>
      {
        isLoggedIn
        ? <Grid item xs={4} display="flex" justifyContent="flex-end">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
          </Grid>
        : null
      }
    </Grid>
  );
}

export default Header;
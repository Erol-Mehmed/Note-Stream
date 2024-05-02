import { Grid } from '@mui/material';
import './Header.scss';
import iconNote from '../../assets/icon-note.svg';

const Header = () => {
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
      <Grid item xs={4}>
      </Grid>
    </Grid>
  );
}

export default Header;
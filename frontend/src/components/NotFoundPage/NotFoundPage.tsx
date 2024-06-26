import { FunctionComponent, useEffect } from "react";
import { Grid } from "@mui/material";
import "./NotFoundPage.scss";
import { Link } from "react-router-dom";

interface NotFoundPageProps {
  onRender: () => void;
}

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({ onRender }) => {
  useEffect(() => {
    if (onRender) {
      onRender();
    }
  }, [onRender]);

  return (
    <Grid className="not-found" display="flex" alignItems="center" flexDirection="column">
      <h1>404 - Not Found!</h1>
      <p>
        Oops! The page you were looking for does not exist. You might have mistyped the address or the page may have moved.
      </p>
      <Link to="/" className="link">Go to Home Page</Link>
    </Grid>
  );
}

export default NotFoundPage;

import { Box, Grid } from "@mui/material";
import "./MainContent.scss";
import {useEffect, useRef, useState} from "react";

const MainContent = () => {
  const [ openEditor, setOpenEditor ] = useState(false);
  const editorRef = useRef(null);
  
  const handleClickOutside = (event: any) => {
      if (editorRef.current && !editorRef.current.contains(event.target) && openEditor) {
        setOpenEditor(false);
      }
    };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  });
  
  return (
    <Grid container className="main-content" justifyContent="center">
      <Grid item xs={6} className="editor" ref={editorRef}>
        {
        openEditor ?
          (<Box className="opened" display="flex" flexDirection="column">
            <input name="title" placeholder="Title"></input>
            <input name="note" placeholder="Take a note..."></input>
          </Box>) :
          (<Box className="closed" onClick={() => setOpenEditor(true)}>
            Take a note...
          </Box>)
        }
      </Grid>
    </Grid>
  );
}

export default MainContent;
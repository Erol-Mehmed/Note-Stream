import {Box, Grid} from "@mui/material";
import "./MainContent.scss";
import {useEffect, useRef, useState} from "react";
import api from "../../services/api";

const MainContent = () => {
  const [ openEditor, setOpenEditor ] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  
  const openForm = (event: any) => {
    event.stopPropagation();
    setOpenEditor(true);
  };
  
  const closeForm = (event: any) => {
    event.stopPropagation();
    setOpenEditor(false);
  }
  
  const submitForm = async (event: any) => {
    event.preventDefault();
    
    const [title, content] = Array.from(event.target.querySelectorAll('input')).map((input: any) => input.value);
    console.log({
      title,
      content
    });
    
     await api.post('/notes', {
      title,
      content
    });
     
     setOpenEditor(false);
  };
  
  useEffect(() => {
    if (openEditor) {
      const inputElement = editorRef.current?.querySelector('input[name="note"]');

      if (inputElement instanceof HTMLElement) {
        inputElement.focus();
      }
    }
  }, [openEditor]);
  
  return (
    <Grid container className="main-content" justifyContent="center">
      <Grid item xs={6} className="editor" ref={editorRef} onClick={openForm}>
        {
        openEditor ?
          (<form className="opened" onSubmit={submitForm}>
            <input name="title" placeholder="Title"></input>
            <input name="note" placeholder="Take a note..."></input>
            <Box className="buttons-holder">
              <button type="button" onClick={closeForm}>
                Cancel
              </button>
              <button type="submit">
                Submit
              </button>
            </Box>
          </form>) :
          (<p className="closed">
            Take a note...
          </p>)
        }
      </Grid>
    </Grid>
  );
}

export default MainContent;
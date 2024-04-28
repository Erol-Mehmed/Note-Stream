import { Grid } from "@mui/material";
import "./MainContent.scss";
import {useEffect, useRef, useState} from "react";

const MainContent = () => {
  const [ openEditor, setOpenEditor ] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  
  const handleClickOutside = (event: any) => {
      if (editorRef.current && !editorRef.current.contains(event.target) && openEditor) {
        const closeButton: HTMLButtonElement | null = editorRef.current?.querySelector('button[type="submit"]');
        closeButton?.click();
      }
    };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  });

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
      <Grid item xs={6} className="editor" ref={editorRef} onClick={(event) => {
        event.stopPropagation();
        setOpenEditor(true)}}>
        {
        openEditor ?
          (<form className="opened" ref={formRef} onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}>
              <input name="title" placeholder="Title"></input>
              <input name="note" placeholder="Take a note..."></input>
              <button type="submit" onClick={(event) => {
                event.stopPropagation();
                setTimeout(() => {
                  setOpenEditor(false);
                }, 0);
              }}>
                Close
              </button>
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
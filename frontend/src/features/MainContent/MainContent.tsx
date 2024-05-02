import {Box, Grid} from "@mui/material";
import "./MainContent.scss";
import {useEffect, useRef, useState} from "react";
import api from "../../services/api";
import iconClose from "../../assets/icon-close.svg";

const MainContent = () => {
  const [ openEditor, setOpenEditor ] = useState(false);
  const [ formValidation, setFormValidation ] = useState('');
  const [ formValidationMessage, setFormValidationMessage ] = useState('');
  const [ feedbackMessage, setFeedbackMessage ] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
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
    
    setTitle(title.trim());
    setContent(content.trim());

    console.log(title, content);
    
    if (title.length < 3 || content.length < 30 || [title, content].includes('')) {
      setFormValidation('validation-failed');
      
      if ([title, content].includes('')) {
        setFormValidationMessage('Both fields are required.');
      } else if (title.length < 3 && content.length < 30) {
        setFormValidationMessage('Title must have at least 3 characters and content must have at least 30 characters.');
      } else if (title.length < 3) {
        setFormValidationMessage('Title must have at least 3 characters.');
      } else if (content.length < 30) {
        setFormValidationMessage('Content must have at least 30 characters.');
      }

      event.target.querySelector('button[type="submit"]')?.blur();
      
      return;
    }
    else {
       await api.post('/notes', {
        title,
        content
      });
       
       setFeedbackMessage('Note added successfully.');
    }
     
     setOpenEditor(false);
  };
  
  const handleClick = (event: any) => {
    if (editorRef.current?.contains(event.target)) {
      return;
    }
    
    setOpenEditor(false);
  };
  
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    
    if (name === 'title') {
      setTitle(value);
    } else {
      setContent(value);
    }
  }
  
  useEffect(() => {
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
  
  useEffect(() => {
    if (openEditor) {
      const inputElement = editorRef.current?.querySelector('input[name="note"]');

      if (inputElement instanceof HTMLElement) {
        inputElement.focus();
      }
    } else {
      setFormValidation('');
    }
  }, [openEditor]);

  useEffect(() => {
    if (feedbackMessage) {
      setFeedbackVisible(true);
      setTimeout(() => setFeedbackVisible(false), 10000);
    }
  }, [feedbackMessage]);
  
  return (
    <Grid container className="main-content" direction="column">
      <Grid item className={`editor ${formValidation}`} ref={editorRef} alignSelf="center" onClick={openForm}>
        {
        openEditor ?
          (<form className="opened" onSubmit={submitForm}>
            <input name="title" placeholder="Title" value={title} onChange={handleChange}></input>
            <input name="note" placeholder="Take a note..." value={content} onChange={handleChange}></input>
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
        {
          formValidation ?
          <p className="validation-failed-message">
            {formValidationMessage}
          </p> :
          null
        }
      </Grid>
      
      <Grid item className="notes">
        <h3>
          Notes
        </h3>
        
        
      </Grid>
      
      {
        feedbackMessage && feedbackVisible ?
          <Grid item className={`feedback-message ${feedbackVisible ? 'fade-in' : 'fade-out'}`}>
            <p>
              {feedbackMessage}
            </p>
            <img onClick={() => setFeedbackMessage('')} src={iconClose} alt="Close icon."/>
          </Grid> :
          null
      }
    </Grid>
  );
}

export default MainContent;
import {Box, Grid} from "@mui/material";
import "./MainContent.scss";
import {useEffect, useRef, useState} from "react";
import api from "../../services/api";
import iconClose from "../../assets/icon-close.svg";
import NoteModal from "./NoteModal.tsx";

const MainContent = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [ openEditor, setOpenEditor ] = useState(false);
  const [ formValidation, setFormValidation ] = useState('');
  const [ formValidationMessage, setFormValidationMessage ] = useState('');
  const [ feedbackMessage, setFeedbackMessage ] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  const [ modalTitle, setModalTitle ] = useState('');
  const [ modalContent, setModalContent ] = useState('');
  const [ modalId, setModalId ] = useState(0);
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fetchData, setFetchData] = useState('');
  
  const openForm = (event: any) => {
    event.stopPropagation();
    setOpenEditor(true);
  };
  
  const closeForm = (event: any) => {
    event.stopPropagation();
    setTitle('');
    setContent('');
    setOpenEditor(false);
  }
  
  const submitForm = async (event: any) => {
    event.preventDefault();
    
    setTitle(title.trim());
    setContent(content.trim());

    const localTitle = title.trim();
    const localContent = content.trim();
    
    if (localTitle.length < 3 || localContent.length < 30 || [localTitle, localContent].includes('')) {
      setFormValidation('validation-failed');
      
      if ([localTitle, localContent].includes('')) {
        setFormValidationMessage('Both fields are required.');
      } else if (localTitle.length < 3 && localContent.length < 30) {
        setFormValidationMessage('Title must have at least 3 characters and content must have at least 30 characters.');
      } else if (localTitle.length < 3) {
        setFormValidationMessage('Title must have at least 3 characters.');
      } else if (localContent.length < 30) {
        setFormValidationMessage('Note content must have at least 30 characters.');
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
       setFetchData('fetch');
    }
     
     setOpenEditor(false);
  };
  
  const handleClick = (event: any) => {
    if (editorRef.current?.contains(event.target)) {
      return;
    }
    
    setTitle('');
    setContent('');
    setOpenEditor(false);
  };
  
  const handleChange = (event: any) => {
    const value = event.target.innerText;
    const name = event.target.className;
    
    if (name === 'title') {
      setTitle(value);
    } else {
      setContent(value);
    }
  }
  
  const handleOpenModal = (title: string, content: string, id: number) => {
    setModalTitle(title);
    setModalContent(content);
    setModalId(id);
    setOpenModal(true);
  };

  const handleCloseModal = async (title: string, content: string, id: number, isChangedOrDelete: boolean | string) => {
    if (isChangedOrDelete === true) {
      await api.put(`/notes/${id}`, {
        title,
        content
      });
      
      setFeedbackMessage('Note updated successfully.');
      setFetchData('fetch')
    } else if (isChangedOrDelete === 'delete') {
      await api.delete(`/notes/${id}`);
      
      setFeedbackMessage('Note deleted successfully.');
      setFetchData('fetch')
    }
    
    setOpenModal(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/notes');
      setData(response.data);
    };
    
    fetchData().then(r => r);
    setFetchData('');
  }, [fetchData]);
  
  useEffect(() => {
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
  
  useEffect(() => {
    if (openEditor) {
      const contentElement = editorRef.current?.querySelector('.content');

      if (contentElement instanceof HTMLElement) {
        contentElement.focus();
      }
    } else {
      setFormValidation('');
    }
  }, [openEditor]);

  useEffect(() => {
    if (feedbackMessage) {
      setFeedbackVisible(true);
      setTimeout(() => {
        setFeedbackVisible(false);
        setFeedbackMessage(''); 
      }, 10000);
    }
  }, [feedbackMessage]);
  
  return (
    <Grid container className="main-content" direction="column">
      <Grid item className={`editor ${formValidation}`} ref={editorRef} alignSelf="center" onClick={openForm}>
        {
        openEditor ?
          (<form className="opened" onSubmit={submitForm}>
            <div
              className="title"
              contentEditable="true"
              onInput={handleChange}
              data-placeholder="Title"
            />
            <div
              className="content"
              contentEditable="true"
              onInput={handleChange}
              data-placeholder="Take a note..."
            />
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

      <Grid item className="notes-container">
        <h3>
          Notes
        </h3>
        <Box className="notes">
          {data.map((note: any, index) => (
            <Box key={index} className="note" onClick={() => handleOpenModal(note.title, note.content, note.id)}>
              <p className="title">
                {note.title}
              </p>
              <p className="content">
                {note.content}
              </p>
            </Box>
          ))}
          
          {openModal && <NoteModal open={openModal} handleClose={handleCloseModal} title={modalTitle} content={modalContent} id={modalId} />}
        </Box>
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
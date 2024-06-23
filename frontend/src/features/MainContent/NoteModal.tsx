import { Modal, Box } from '@mui/material';
import React, {useState, useEffect, useRef} from "react";
import './NoteModal.scss';

interface NoteModalProps {
  handleClose: (title: string, content: string, id: number, isChanged: boolean | string) => void;
  title: string,
  content: string,
  id: number,
  open: boolean
}

const NoteModal: React.FC<NoteModalProps> = ({ open, handleClose, title: initialTitle, content: initialContent, id }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isChanged, setIsChanged] = useState(false);
  const [formValidation, setFormValidation] = useState('');
  const [formValidationMessage, setFormValidationMessage] = useState('');
  const [showDeleteConfirmationDialog , setShowDeleteConfirmationDialog] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const cancelChanges = () => {
    setTitle(initialTitle);
    setContent(initialContent);
    handleClose(initialTitle, initialContent, id, false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const validation = (closeBtn: boolean) => {
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

      if (closeBtn) {
        closeBtnRef.current?.blur();
      }
    } else {
      handleClose(title, content, id, isChanged);
    }
  };

  useEffect(() => {
    if (initialTitle !== title || initialContent !== content) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [title, content]);

  return (
    <Modal className="modal" open={open} onClose={() => validation(false)}>
        <Box className={`modal-content ${formValidation} ${showDeleteConfirmationDialog ? 'delete-confirm' : ''}`}>
          {
            !showDeleteConfirmationDialog
            ? <>
              <h2>
                View and edit your note
              </h2>
              <hr />
              <input
                className="title"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
              <textarea
                className="content"
                placeholder="Take a note..."
                value={content}
                onChange={handleContentChange}
              />
              <Box className="btn-wrapper" display="flex" alignSelf="flex-end">
                <button onClick={() => setShowDeleteConfirmationDialog(true)}>
                  Delete
                </button>
                <button onClick={() => cancelChanges()}>
                  Cancel
                </button>
                <button ref={closeBtnRef} onClick={() => validation(true)}>
                  Submit
                </button>
              </Box>
              {
                formValidation ?
                <p className="validation-failed-message">
                  {formValidationMessage}
                </p> :
                null
              }
            </>
            : <>
              <h2>
                Are you sure you want to delete this note?
              </h2>
              <Box className="btn-wrapper" display="flex" justifyContent="center">
                <button onClick={() => setShowDeleteConfirmationDialog(false)}>
                  Cancel
                </button>
                <button onClick={() => handleClose(title, content, id, 'delete')}>
                  Confirm
                </button>
              </Box>
            </>
          }
        </Box>
    </Modal>
  );
}

export default NoteModal;
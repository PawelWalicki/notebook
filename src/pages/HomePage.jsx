import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addNote, editNoteText, getNote } from '../services/noteService';
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  // const user = auth.currentUser
  const {user} = useAuth()
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [notesInEdit, setNotesInEdit] = useState(new Set())

  useEffect(() => {
    getNote(setNotes)
    console.log(user)
  }, [user])

  const handleAddNote = () => {
    if (newNote.trim()) {
      addNote({ title: newNoteTitle, text: newNote });
      setNewNote('');
      setNewNoteTitle('');
    }
  };

  const handleEditNote = (index, id) => {
    if(notesInEdit.has(id)){
      // SAVE
      setNotesInEdit((prev) => {
        prev.delete(id)

        return prev
    })
    } else {
      setNotesInEdit((prev)=> {
        prev.add(id)
        return prev
      } )
    }
    // setNotesInEdit((prev) => [...notesInEdit, id])
    //TODO
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, editable: !note.editable } : note
    );
    setNotes(updatedNotes);
  };

  const handleChangeNote = (id, newText) => {
    editNoteText(id, newText)
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Notes App</h1>
      <TextField
        fullWidth
        label="Note title"
        value={newNoteTitle}
        onChange={(e) => setNewNoteTitle(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
      />
      <TextField
        fullWidth
        label="Add a new note"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
      />
      <Button variant="contained" color="primary" onClick={handleAddNote} style={{ marginTop: '10px' }}>
        Add Note
      </Button>

      {notes.map((note, index) => (
        <Accordion key={index} style={{ marginTop: '10px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{notesInEdit.has(note.id)  ? 'Editing...' : `${note.title}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {notesInEdit.has(note.id) ? (
              <TextField
                multiline 
                fullWidth
                value={note.text}
                onChange={(e) => handleChangeNote(note.id, e.target.value)}
              />
            ) : (
              <Typography>{note.text}</Typography>
            )}
            <Button onClick={() => handleEditNote(index, note.id)} style={{ marginTop: '10px' }}>
              {notesInEdit.has(note.id)  ? 'Save' : 'Edit'}
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

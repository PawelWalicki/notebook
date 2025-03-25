import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Button, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteTitle, setNewNoteTitle] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { title: newNoteTitle, text: newNote, editable: false }]);
      setNewNote('');
      setNewNoteTitle('');
    }
  };

  const handleEditNote = (index) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, editable: !note.editable } : note
    );
    setNotes(updatedNotes);
  };

  const handleChangeNote = (index, newText) => {
    const updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, text: newText } : note
    );
    setNotes(updatedNotes);
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
            <Typography>{note.editable ? 'Editing...' : `${note.title}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {note.editable ? (
              <TextField
                multiline 
                fullWidth
                value={note.text}
                onChange={(e) => handleChangeNote(index, e.target.value)}
              />
            ) : (
              <Typography>{note.text}</Typography>
            )}
            <Button onClick={() => handleEditNote(index)} style={{ marginTop: '10px' }}>
              {note.editable ? 'Save' : 'Edit'}
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

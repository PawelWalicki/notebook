import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TextField, Button, Typography, Container, Grid2 } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addNote, deleteNote, editNoteText, getNote } from '../services/noteService';
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {

  const { user } = useAuth()
  const [, forceRender] = useState(0)
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
    if (notesInEdit.has(id)) {
      
      setNotesInEdit((prev) => {
        prev.delete(id)

        return prev
      })
    } else {
      setNotesInEdit((prev) => {
        prev.add(id)
        return prev
      })
    }
    forceRender(prev => prev + 1)
  };

  const handleChangeNote = (id, newText) => {
    editNoteText(id, newText)
  };

  return (
    <Container>
      <Grid2 container spacing={2} size="grow" display="flex" justifyContent="center" alignItems="center">
        <Grid2 size={7}>
          <h1 style={{ textAlign: 'center' }}>Notes App</h1>
          <TextField
            fullWidth
            label="Note title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#417f9e",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#417f9e",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-outlined": {
                color: "#417f9e",
              },
            }}
          />
        </Grid2>
        <Grid2 size={7}>
          <TextField
            fullWidth
            label="Add a new note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#417f9e",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#417f9e",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-outlined": {
                color: "#417f9e",
              },
            }}
          />
        </Grid2>
        <Grid2 display="flex" justifyContent="center" alignItems="center" size={7}>
          <Button variant="contained" color="primary" onClick={handleAddNote} style={{ marginTop: '1px' }}>
            Add Note
          </Button>
        </Grid2>
        <Grid2 size={7}>
          {notes.map((note, index) => (
            <Accordion key={index} style={{marginBottom: '15px' }} sx={{ backgroundColor: '#f5f5f5', }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{notesInEdit.has(note.id) ? 'Editing...' : `${note.title}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {notesInEdit.has(note.id) ? (
                  <TextField
                    multiline
                    fullWidth
                    value={note.text}
                    onChange={(e) => handleChangeNote(note.id, e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        color: "#417f9e",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#417f9e",
                          borderWidth: "2px",
                        },
                      },
                      "& .MuiInputLabel-outlined": {
                        color: "#417f9e",
                      },
                    }}
                  />
                ) : (
                  <Typography>{note.text}</Typography>
                )}
                <Button onClick={() => handleEditNote(index, note.id)} style={{ marginTop: '10px' }}>
                  {notesInEdit.has(note.id) ? 'Save' : 'Edit'}
                </Button>
                <Button onClick={() => deleteNote(note.id)} style={{ marginTop: '10px' }}>
                  Delete
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid2>
      </Grid2>
    </Container>
  );
};

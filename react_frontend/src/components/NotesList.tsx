import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import RefactorNote from './NotesComponents/updateNote/RefactorNote';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AddUserToNote from "./NotesComponents/addUserToNote/AddUserToNote.tsx";

// Interfaces for Note and Props
interface Note {
  title: string;
  text: string;
  id: number;
}

interface NotesListProps {
  results: Note[];
  setStateResults: (newResults: Note[]) => void;
  restoreNote: (index: number) => void;
  deleteNote: (index: number) => void;
  isSpecial: boolean;
  positionData: boolean;
}

// UserNoteState type for managing dialog state
type UserNoteState = {
  open: boolean;
  index: null | number;
};

const NotesList: React.FC<NotesListProps> = ({ results, setStateResults, restoreNote, deleteNote, isSpecial, positionData }) => {
  // State for selected note and adding user to note dialog
  const [selectedNoteIndex, setSelectedNoteIndex] = useState<number | null>(null);
  const [addUserToNoteParam, setAddUserToNoteParam] = useState<UserNoteState>({ open: false, index: null });

  // Function to update note data
  const updateNote = (index: number, updatedNote: any) => {
    const newResults = [...results];
    newResults[index] = updatedNote
    setStateResults(newResults);
    setSelectedNoteIndex(index);
  };

  // Handlers for note click and closing dialogs
  const handleNoteClick = (index: number) => setSelectedNoteIndex(index);
  const handleCloseRefactorNote = () => setSelectedNoteIndex(null);
  const handleCloseAddUser = () => setAddUserToNoteParam({ open: false, index: null });

  return (
    <Box sx={{marginBottom:"60px"}}>
      {/* Refactor Note Dialog */}
      {selectedNoteIndex !== null && !isSpecial && (
        <RefactorNote
          title={results[selectedNoteIndex].title}
          text={results[selectedNoteIndex].text}
          sql_index={results[selectedNoteIndex].id}
          open={selectedNoteIndex !== null}
          onClose={handleCloseRefactorNote}
          onSave={(updatedTitle, updatedText) => {
            const updatedNote: Note = {
              title: updatedTitle,
              text: updatedText,
              id: results[selectedNoteIndex].id
            };
            updateNote(selectedNoteIndex, updatedNote);
          }}
        />
      )}

      {/* Add User to Note Dialog */}
      {addUserToNoteParam.open !== false && !isSpecial && (
        <AddUserToNote open={addUserToNoteParam.open} onClose={handleCloseAddUser} sql_index={addUserToNoteParam.index} />
      )}

      {/* Grid of Note Cards */}
      {results !== null && (
        <Grid container spacing={2} alignItems={positionData ? 'center' : 'flex-end'} direction={positionData ? 'column' : 'row'}>
          {results.map((result, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ width: '100%' , marginBottom: '40px' }}>
              <Card sx={{ margin: "0 auto", maxWidth: positionData ? '700px' : "240px",}}>
                <CardContent onClick={() => handleNoteClick(index)}>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {result.title}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {result.text}
                  </Typography>
                </CardContent>

                {/* Actions */}
                {/*<Hidden smDown>*/}
                  <CardActions>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ ml: '1px', padding: '6px' }}
                      onClick={() => deleteNote(index)}
                    >
                      <DeleteForeverSharpIcon />
                    </IconButton>

                    {!isSpecial &&
                      <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        sx={{ ml: '1px', padding: '6px' }}
                        onClick={() => {
                          setAddUserToNoteParam({ open: true, index: result.id });
                        }}
                      >
                        <PersonAddAltRoundedIcon />
                      </IconButton>
                    }

                    {isSpecial &&
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, padding: "6px" }}
                        onClick={() => restoreNote(index)}
                      >
                        <RestoreFromTrashIcon />
                      </IconButton>
                    }
                  </CardActions>
                {/*</Hidden>*/}
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default NotesList;

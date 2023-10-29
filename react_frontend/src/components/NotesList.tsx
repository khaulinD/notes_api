import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, Typography, Grid, Hidden, CardActions, Container, IconButton} from '@mui/material';
import NewNote from "./NotesComponents/NewNote.tsx";
import SideBar from "./SideBar.tsx";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
interface Note {
  title: string;
  text: string;
}

interface NotesListProps {
  results: Note[];
  positionData: boolean;
  isSpecial:boolean;
  // sideBarOpen:boolean;
  // setSideBarOpen: (open: boolean) => void;
  deleteNote: (index: number) => void;
  restoreNote: (index: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({ results,restoreNote,isSpecial, positionData,deleteNote }) => {



  return (
     <Box >
          {results.length > 0 ? ( // Check if searchResults has elements
              <Grid
                container
                direction={positionData ? 'column' : 'row'}
                spacing={2}
                alignItems={positionData ? 'center' : 'flex-end'}
              >
                {results.map((result, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} sx={{width:"100%"}}>
                    <Card sx={{margin:"0 auto", maxWidth: positionData ? '700px': "240px",marginBottom: '40px' }}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {result.title}
                        </Typography>
                        <Typography variant="h6" component="div">
                          {result.text}
                        </Typography>
                      </CardContent>
                      <Hidden smDown={!positionData}>
                        <CardActions>
                          {/*<Button size="small">Learn More</Button>*/}
                          <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ml:"1px", padding:"6px"}}
                            onClick={() => deleteNote(index)}
                          >
                            <DeleteForeverSharpIcon/>
                          </IconButton>
                          {isSpecial?
                              <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2, padding:"6px"}}
                            onClick={() => restoreNote(index)}
                          >
                            <RestoreFromTrashIcon/>
                          </IconButton>
                              :""}

                        </CardActions>
                      </Hidden>
                    </Card>
                  </Grid>
                ))}
              </Grid>
               ) : (
              "" // Display a message when there are no search results
            )}
         </Box>
  );
};

export default NotesList;

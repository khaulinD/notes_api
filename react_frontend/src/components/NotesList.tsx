import React, {useEffect, useState} from 'react';
import { Box, Button, Card, CardContent, Typography, Grid, Hidden, CardActions } from '@mui/material';
import NewNote from "./NotesComponents/NewNote.tsx";

interface Note {
  title: string;
  text: string;
}

interface NotesListProps {
  results: Note[];
  positionData: boolean;
}

const NotesList: React.FC<NotesListProps> = ({ results, positionData }) => {
  const [stateResults, setStateResults] = useState(results);


    useEffect(() => {
    setStateResults(results);
  }, [results]);
  const addNoteToResults = (title: string, text: string) => {
  const newNote = { title, text };
  setStateResults([newNote, ...stateResults]);
};

  return (
    <Box>
      <NewNote onAddNote={addNoteToResults} />

      <Grid
        container
        direction={positionData ? 'column' : 'row'}
        spacing={2}
        alignItems={positionData ? 'center' : 'flex-end'}
      >
        {stateResults.map((result, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ width: '100%' }}>
            <Card sx={{ margin: '0 auto', maxWidth: '700px', marginBottom: '40px' }}>
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
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Hidden>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NotesList;

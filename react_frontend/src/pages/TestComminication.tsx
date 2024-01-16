import React, { useEffect, useState } from 'react';
import Scroll from '../components/Scroll.tsx';
import NotesList from '../components/NotesList.tsx';
import { Box } from '@mui/material';
import useAxiosWithJwtInterceptor from '../helper/jwtinterseptor.ts';
import { fetchContentWithTitle, updateIsInBasket } from '../components/requests/request_to_db.ts';
import PrimaryAppBar from '../components/PrimaryAppBar.tsx';
import SideBar from '../components/SideBar.tsx';

interface Note {
  title: string;
  text: string;
  created_at:string;
  is_in_basket:boolean;
  creator:number;
  extra_user:{
    id:number;
    username:string;
    logo_url:string;
    can_edit:boolean;
  }
}

const NoteComponent: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [data, setData] = useState<boolean>(true);
  const [sideBar, setSideBar] = useState<boolean>(false);
  const jwtAxios = useAxiosWithJwtInterceptor();
  const [stateResults, setStateResults] = useState<Note[]>(searchResults);


    useEffect(() => {
    console.log('Connecting to WebSocket...');
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/note/');
    const user = localStorage.getItem('user_id') ?? '';

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      ws.send(JSON.stringify({ user_id: user }));
    };


    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as { notes?: Note[]; updated_note?: Note };
      console.log(data)
      if (data.notes) {
        setNotes(data.notes);
      } else if (data.updated_note) {
        // updateNoteInList(data.updated_note);
      }
    };



  }, []);

  // const updateNoteInList = (updatedNote: Note) => {
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === updatedNote.id ? { ...note, note: updatedNote.note } : note
  //     )
  //   );
  // };

  const handleSearch = async (searchText: string) => {
    const noteResultsWithFilter: Note[] = await fetchContentWithTitle(
      'notes',
      searchText,
      false,
      jwtAxios
    );
    setSearchResults(noteResultsWithFilter);
  };

  const deleteNote = async (index: number) => {
    try {
      const newNotes = [...stateResults];
      const noteId = newNotes[index].id;
      newNotes.splice(index, 1);
      setStateResults(newNotes);

      await updateIsInBasket(noteId, true, jwtAxios);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const toggleSideBar = () => setSideBar((prev) => !prev);

  useEffect(() => {
    setStateResults(searchResults);
  }, [searchResults]);

  // const addNoteToResults = (title: string, text: string) => {
  //   const newNote = { id: Date.now(), note: { title, text } };
  //   setStateResults([newNote, ...stateResults]);
  // };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <PrimaryAppBar onSearch={handleSearch} setData={setData} sideBarActivity={toggleSideBar} />
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Box
          sx={{
            width: sideBar ? '280px' : '67px',
            marginBottom: '20px',
            '@media (max-width: 600px)': {
              width: sideBar ? '280px' : '0px',
            },
          }}
        >
          <SideBar open={sideBar} setSideBar={setSideBar} />
        </Box>
        <Box sx={{ flex: '3', minWidth: 0 }}>
          <Scroll>
            <NotesList
              results={notes}
              setStateResults={setStateResults}
              isSpecial={false}
              positionData={data}
              deleteNote={deleteNote}
            />
          </Scroll>
        </Box>
      </Box>
    </Box>
  );
};

export default NoteComponent;

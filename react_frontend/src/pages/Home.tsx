import { Box } from "@mui/material";
import PrimaryAppBar from "../components/PrimaryAppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import NotesList from "../components/NotesList";
import Scroll from "../components/Scroll";
import {fetchContent, fetchContentWithTitle, updateIsInBasket} from "../components/requests/request_to_db.ts";
import SideBar from "../components/SideBar.tsx";
import NewNote from "../components/NotesComponents/NewNote.tsx";
import CustomizedSnackbars from "../components/Additional/Alert.tsx";

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [data, setData] = useState<boolean>(true);
  const [sideBar, setSideBar] = useState(false)

    const [stateResults, setStateResults] = useState(searchResults);
    useEffect(() => {
      const fetchData = async () => {
        const noteResults = await fetchContent("notes", false);
        setSearchResults(noteResults);
      };
      fetchData();
    }, []);
   const  handleSearch = async (searchText: string) => {
      const noteResultsWithFilter:any = await fetchContentWithTitle("notes", searchText,false);
      setSearchResults(noteResultsWithFilter);

  };
    // useEffect(() => {
    const deleteNote = async (index: number) => {
        const  newNotes = [...stateResults];
        const noteId = newNotes[index].id
        newNotes.splice(index, 1);
        await setStateResults(newNotes);
        await updateIsInBasket(noteId, true)
    };
    // }, []);

   const setSideBarActivity =()=>{
        if (!sideBar) {
        setSideBar(true);
      } else {
        setSideBar(false);
      }
    }

     // const [hovering, setHovering] = useState(false);
    useEffect(() => {
    setStateResults(searchResults);
    }, [searchResults]);
  const addNoteToResults = (title: string, text: string) => {
  const newNote = { title, text };
  setStateResults([newNote, ...stateResults]);
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  <PrimaryAppBar onSearch={handleSearch} setData={setData} sideBarActivity={setSideBarActivity} />

  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    <Box sx={{  width:sideBar?"280px":"67px", marginBottom: '20px' }}>
      <SideBar open={sideBar} setSideBar={setSideBar} />
    </Box>
    <Box sx={{ flex: '3', minWidth: 0 }}>
      <Scroll>
          <NewNote onAddNote={addNoteToResults} />
        <NotesList
            results={stateResults}
            isSpecial={false}
            positionData={data}
            sideBarOpen={sideBar}
            setSideBarOpen={setSideBar}
            deleteNote={deleteNote}/>
      </Scroll>
    </Box>
  </Box>
</Box>


  );
};

export default Home;

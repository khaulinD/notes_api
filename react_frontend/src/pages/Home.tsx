import { Box } from "@mui/material";
import PrimaryAppBar from "../components/PrimaryAppBar";
import { useEffect, useState } from "react";

import NotesList from "../components/NotesList";
import Scroll from "../components/Scroll";
import {fetchContent, fetchContentWithTitle, updateIsInBasket} from "../components/requests/request_to_db.ts";
import SideBar from "../components/SideBar.tsx";
import NewNote from "../components/NotesComponents/NewNote.tsx";

import useAxiosWithJwtInterceptor from "../helper/jwtinterseptor.ts";


const Home = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [data, setData] = useState<boolean>(true);
  const [sideBar, setSideBar] = useState(false)
    const jwtAxios = useAxiosWithJwtInterceptor()
    const [stateResults, setStateResults] = useState(searchResults);
  // const [resultsNote, setResults] = useState<Note[] | null>(results);


useEffect(() => {
  const fetchData = async () => {
    try {
      const noteResults = await fetchContent("notes", false, jwtAxios);
      setSearchResults(noteResults);
      console.log("fetchData called");
    } catch (error) {
      console.log("Can't send request");
    }
  };

  fetchData();
}, []); // Add the specific dependency here
  const handleSearch = async (searchText: string) => {
    const noteResultsWithFilter: any = await fetchContentWithTitle("notes", searchText, false, jwtAxios);
    setSearchResults(noteResultsWithFilter);
    console.log("serach")
  };
     const deleteNote = async (index: number) => {
    try {
      const newNotes = [...stateResults];
      const noteId = newNotes[index].id;
      newNotes.splice(index, 1);
      setStateResults(newNotes); // Обновить состояние сразу

      // Выполнить удаление и обновление в базе данных
      await updateIsInBasket(noteId, true, jwtAxios);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };


   const setSideBarActivity =()=>{
        if (!sideBar) {
        setSideBar(true);
      } else {
        setSideBar(false);
      }
    }

    useEffect(() => {
    setStateResults(searchResults);
    }, [searchResults]);
  const addNoteToResults = (title: string, text: string) => {
  const newNote = { title, text };
  setStateResults([newNote, ...stateResults]);
};

  return(
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
    <PrimaryAppBar onSearch={handleSearch} setData={setData} sideBarActivity={setSideBarActivity} />
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
    <Box sx={{width:sideBar?"280px":"67px", marginBottom: '20px','@media (max-width: 600px)': {
      width:sideBar?"280px":"0px"}, }}>
      <SideBar open={sideBar} setSideBar={setSideBar} />
    </Box>
    <Box sx={{ flex: '3', minWidth: 0}}>
      <Scroll>
       <NewNote onAddNote={addNoteToResults} />
        <NotesList
           results={stateResults}
          setStateResults={setStateResults}
           isSpecial={false}
           positionData={data}
          // sideBarOpen={sideBar}
         // setSideBarOpen={setSideBar}
            deleteNote={deleteNote}/>
      </Scroll>
    </Box>
  </Box>

    </Box>

  );
};

export default Home;

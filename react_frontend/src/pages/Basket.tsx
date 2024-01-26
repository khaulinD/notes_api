import { Box } from "@mui/material";
import PrimaryAppBar from "../components/PrimaryAppBar";
import { useEffect, useState } from "react";
import NotesList from "../components/NotesList";
import Scroll from "../components/Scroll";
import {
    fetchContent,
    fetchContentWithTitle,
    deleteSomeNote,
    updateIsInBasket
} from "../components/requests/request_to_db.ts";
import SideBar from "../components/SideBar.tsx";
import useAxiosWithJwtInterceptor from "../helper/jwtinterseptor.ts";

const Basket: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [data, setData] = useState<boolean>(true);
  const [sideBar, setSideBar] = useState(false)
    const jwtAxios = useAxiosWithJwtInterceptor()
    useEffect(() => {
      const fetchData = async () => {
        const noteResults = await fetchContent("notes",true,jwtAxios);
        setSearchResults(noteResults);
      };
      fetchData();
    }, []);
   const  handleSearch = async (searchText: string) => {
      const noteResultsWithFilter:any = await fetchContentWithTitle("notes", searchText,true,jwtAxios);
      setSearchResults(noteResultsWithFilter);

  };
   const setSideBarActivity =()=>{
        if (!sideBar) {
        setSideBar(true);
      } else {
        setSideBar(false);
      }
    }

   const restoreNote = async (index: number) => {
    try {

        const newNotes = [...searchResults];
        const noteId = newNotes[index].id;
         const updateIsInBasketStatus =  await updateIsInBasket(noteId, false, jwtAxios);
      if (updateIsInBasketStatus===200) {
        newNotes.splice(index, 1);
        setSearchResults(newNotes); // Обновить состояние сразу

        // Выполнить удаление и обновление в базе данных
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
    const deleteNote = async (index: number) => {
        const  newNotes = [...searchResults];
        const noteId = newNotes[index].id
        newNotes.splice(index, 1);
        await setSearchResults(newNotes);
        await deleteSomeNote(noteId, jwtAxios)
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
        <NotesList results={searchResults}
                   positionData={data}
                   // sideBarOpen={sideBar}
                   // setSideBarOpen={setSideBar}
                   deleteNote={deleteNote}
                   isSpecial={true}
                   restoreNote={restoreNote}/>
      </Scroll>
    </Box>
  </Box>
</Box>


  );
};

export default Basket;

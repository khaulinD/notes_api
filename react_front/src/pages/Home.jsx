import {Box} from "@mui/material";
import PrimaryAppBar from "../components/PrimaryAppBar.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../config.js";
import NotesList from "../components/NotesList.jsx";
import Scroll from "../components/Scroll.jsx";

const Home = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState(true)
     useEffect(() => {
        async function fetchNotes() {
      try {
        const response = await axios.get(`${BASE_URL}notes/`);
        const data = response.data;
        setSearchResults(data);
      } catch (error) {
        console.error("Ошибка при выполнении GET-запроса:", error);
      }
    }

    fetchNotes();
    },[])// Пустой массив зависимостей означает, что эффект будет выполняться только при монтировании

    const handleSearch = (searchText) => {
    // Функция для выполнения GET-запроса при монтировании компонента
    async function fetchNotes() {
      try {
        let response
        // Выполняем GET-запрос по указанному URL
        if (!searchText){
          response = await axios.get(`${BASE_URL}notes/`);
        }
        else{
         response = await axios.get(`${BASE_URL}notes/?title=${searchText}`);
          }
        // Извлекаем данные из ответа
        const data = response.data;

        // Обновляем состояние с полученными данными
        setSearchResults(data);
      } catch (error) {
        console.error("Ошибка при выполнении GET-запроса:", error);
      }
    }
    fetchNotes();
  };
  return <Box sx={{backgroundColor:"black",width:"100%",height:"100%"}}>

            <PrimaryAppBar onSearch={handleSearch} setData={setData} />
              <Scroll>
                <NotesList results={searchResults} positionData={data} />
              </Scroll>
        </Box>
}

export default Home

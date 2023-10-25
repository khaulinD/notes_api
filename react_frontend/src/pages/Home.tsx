import { Box } from "@mui/material";
import PrimaryAppBar from "../components/PrimaryAppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import NotesList from "../components/NotesList";
import Scroll from "../components/Scroll";

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [data, setData] = useState<boolean>(true);

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
  }, []);

  const handleSearch = (searchText: string) => {
    async function fetchNotes() {
      try {
        let response;

        if (!searchText) {
          response = await axios.get(`${BASE_URL}notes/`);
        } else {
          response = await axios.get(`${BASE_URL}notes/?title=${searchText}`);
        }

        const data = response.data;
        setSearchResults(data);
      } catch (error) {
        console.error("Ошибка при выполнении GET-запроса:", error);
      }
    }

    fetchNotes();
  };
  return (
    <Box >
      <PrimaryAppBar onSearch={handleSearch} setData={setData} />
      <Scroll>
        <NotesList results={searchResults} positionData={data} />
      </Scroll>

    </Box>

  );
};

export default Home;

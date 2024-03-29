import React, {useEffect, useState} from "react";
import {
    Box,
    Divider,
    IconButton,
    InputBase,
    Typography,
    Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from '@mui/icons-material/Cached';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import GridViewIcon from '@mui/icons-material/GridView';
import ToogleDraw from "./PrimaryComponents/ToogleDraw";
import AccountMenu from "./PrimaryComponents/AccountButtom.tsx";
import MenuIcon from '@mui/icons-material/Menu';
import "./styles/PrimaryAppBar.css"
// Define the props interface for the PrimaryAppBar component
interface PrimaryAppBarProps {
  onSearch: (text: string) => void; // Callback function for searching
  setData: (data: boolean) => void; // Function for updating data
  sideBarActivity: () => void;
}
// interface Props {
//     pen: boolean;
//     handleDrawerClose: () => void;
//     handleDrawerOpen: () => void;
// }


const PrimaryAppBar: React.FC<PrimaryAppBarProps> = ({ onSearch, setData, sideBarActivity}) => {
  // const [isSearched, setIsSearched] = useState(false); // State to track search
  const [searchText, setSearchText] = useState(""); // State for search text
  const [notesPosition, setNotesPosition] = useState(false); // State for notes position
    const [showToogleDraw, setShowToogleDraw] = useState(false);

    const isSearched = false

  useEffect(() => {
    const handleResize = () => {
      // Проверяем размер экрана и устанавливаем, должен ли отображаться ToogleDraw
      if (window.innerWidth <= 768) {
        setShowToogleDraw(true);
      } else {
        setShowToogleDraw(false);
      }
    };
    // Добавляем обработчик изменения размера окна при загрузке компонента
    handleResize();
    window.addEventListener("resize", handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Search handler
  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text); // Call the callback function to perform the search
  };

  // Handler for changing the notes position
  const notesPositionFunc = () => {
    setNotesPosition(!notesPosition); // Invert the notes position state
    setData(notesPosition); // Call the function to update data
  };
  //   const handleClick = () => {
  //   // Вызовите функцию обратного вызова и передайте данные при клике
  //   setSideBarActivity();
  // };
  return (
      <Box sx={{width:"100%"}}>
    <Box sx={{ paddingTop: "10px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>

      <Box sx={{ display: isSearched ? "none" : "flex", alignItems: "center", marginRight:"20px", marginLeft: "20px" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ padding:"12px" }}
            onClick={sideBarActivity}
          >
            <MenuIcon  />
          </IconButton>
                <img
              alt="logo"
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              className="logo"
            />
        <Typography variant="h5" component="h2" sx={{color:"gray"}}>Keep</Typography>
      </Box>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: isSearched
            ? "block"
            : {sm:"flex", md: "flex", xs: "none" },
          alignItems: 'center',
          width: showToogleDraw ? "400": "700px",
          maxHeight: 50,
            marginRight:"20px",
            backgroundColor:"#F1F3F4"
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          inputProps={{ 'aria-label': 'Search' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        </IconButton>
      </Paper>



      {showToogleDraw ? <ToogleDraw /> :
          <Box sx={{ display: "flex", flexWrap: "nowrap", right: "0px", mt:"10px" }}>
            {/*<SearchIcon fontSize="large" sx={{color:"gray",  cursor: "pointer", display: { md: "none", xs: "block" }, marginRight: "20px" }}/>*/}
            <CachedIcon fontSize="large" sx={{color:"gray",  cursor: "pointer", marginRight: "20px", '@media (max-width: 768px)': { marginRight: '10px' } }} />
             <SettingsIcon fontSize="large" sx={{color:"gray", cursor: "pointer", marginRight: "20px", '@media (max-width: 768px)': { marginRight: '10px' } }} />
              {!notesPosition ? <GridViewIcon onClick={notesPositionFunc} fontSize="large" sx={{color:"gray",  cursor: "pointer", '@media (max-width: 768px)': { marginRight: '40px' } }} /> :
              <CalendarViewDayIcon onClick={notesPositionFunc} fontSize="large" sx={{color:"gray",  cursor: "pointer", '@media (max-width: 768px)': { marginRight: '40px' } }} />}

                <AccountMenu/>
            {/*<Avatar sx={{ cursor: "pointer", marginLeft: "40px" }}>H</Avatar>*/}
          </Box>
      }

    </Box>
      <hr style={{ color: "gray" }} />
      </Box>
  );
};

export default PrimaryAppBar;

  import { Box, Divider, IconButton, InputBase, Typography, Paper, Avatar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CachedIcon from '@mui/icons-material/Cached';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import { useState } from "react";
import SpeedDialButton from "@mui/material/SpeedDial";

const PrimaryAppBar = ({onSearch, setData}) => {
  const [isSearched, setIsSearched] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [notesPosition, setNotesPosition] = useState(false);
  const handleSearch = (text) => {
    setSearchText(text)
      onSearch(text)
  };
  const notesPositionFunc = ()=>{
      if(notesPosition){
          setNotesPosition(false);
      }else {
          setNotesPosition(true);
      }
      setData(notesPosition)

  };

  return (
    <Box sx={{paddingTop:"10px", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      <Box sx={{ display:isSearched ? "none": "flex" , alignItems: "center", marginLeft: "40px", marginRight: "50px" }}>
        <img alt="logo" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" />
        <Typography>Keep</Typography>
      </Box>
      <Paper
        component="form"
            sx={{
        p: '2px 4px',
        display: isSearched
          ? "block"
          : { sm: "none", md: "flex", xs: "none" },
        alignItems: 'center',
        width: 600,
        maxHeight: 50,
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
          <SearchIcon/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        </IconButton>
      </Paper>
      {/*<Box sx={{ display: "flex", flexWrap: "nowrap", right: "0px" }}>*/}
      {/*  <SearchIcon fontSize="large" sx={{ cursor: "pointer", display: { md: "none", xs: "block" }, marginRight: "20px" }}/>*/}
      {/*  <CachedIcon fontSize="large" sx={{ cursor: "pointer", marginRight: "20px", '@media (max-width: 768px)': { marginRight: '10px' } }} />*/}
      {/*   <SettingsIcon fontSize="large" sx={{ cursor: "pointer", marginRight: "20px", '@media (max-width: 768px)': { marginRight: '10px' } }} />*/}
      {/*    {!notesPosition ? <ViewModuleIcon onClick={notesPositionFunc} fontSize="large" sx={{ cursor: "pointer", '@media (max-width: 768px)': { marginRight: '40px' } }} /> :*/}
      {/*      <CalendarViewDayIcon onClick={notesPositionFunc} fontSize="large" sx={{ cursor: "pointer", '@media (max-width: 768px)': { marginRight: '40px' } }} />}*/}


      {/*  <Avatar sx={{ cursor: "pointer", marginLeft: "40px" }}>H</Avatar>*/}
      {/*</Box>*/}
        <SpeedDialButton/>
    </Box>

  );

}

export default PrimaryAppBar;

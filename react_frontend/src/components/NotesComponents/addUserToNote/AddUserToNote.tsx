import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { BASE_URL } from "../../../config.ts";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import useAxiosWithJwtInterceptor from "../../../helper/jwtinterseptor.ts";
import addUserFromToOtherNote from "./addUserToNote.ts";
import Checkbox from '@mui/material/Checkbox';
// Props for AddUserToNote component
interface AddUserToNoteProps {
  sql_index: number | null;
  open: boolean;
  onClose: () => void;
}

// Interface for User Information
interface UserInfo {
  logo: string;
  email: string;
  username: string;
}




const AddUserToNote: React.FC<AddUserToNoteProps> = ({ open, onClose, sql_index }: AddUserToNoteProps) => {
  // State to manage user information and input value
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userIsernameToAdd, setUserIsernameToAdd] = useState("");
  const [checked, setChecked] = React.useState(false);
  // Axios instance for API calls
  const jwtAxios = useAxiosWithJwtInterceptor();

  // Handle input change
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserIsernameToAdd(event.target.value);
  };

  // Handle saving user information
  const handleSave = async () => {
    await addUserFromToOtherNote(userIsernameToAdd, sql_index, checked, jwtAxios);
    onClose();
  };

  // Fetch user information from session storage on component mount
  const userInfoFromSession = sessionStorage.getItem("userInfo");
  useEffect(() => {
    if (userInfoFromSession) {
      const parsedUserInfo: UserInfo = JSON.parse(userInfoFromSession);
      setUserInfo(parsedUserInfo);
    }
  }, [userInfoFromSession]);



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ paddingBottom: '8px', }}>Add user</DialogTitle>
      <DialogContent sx={{ m:0, p:"0 9px 0 9px", display:'flex'}}>
        <Box sx={{mr:"10px"}}>
          {/* Display user avatar */}
          <IconButton size="small">
            {userInfo !== null && userInfo.logo ? (
              <Avatar src={`${BASE_URL}${userInfo.logo}`} alt="user_logo" />
            ) : (
              <Avatar />
            )}
          </IconButton>
        </Box>
        <Box>
          {/* Display username and email */}
          {userInfo !== null && userInfo.username ? (
            <Typography sx={{fontWeight:"bold"}}>
              {userInfo.username}
            </Typography>
          ) : (
            ""
          )}
          {userInfo !== null && userInfo.email ? (
            <Typography>
              {userInfo.email}
            </Typography>
          ) : (
            ""
          )}
        </Box>
      </DialogContent>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', padding: '0 20px 5px 20px' }}>
  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
    {/* Input field to enter username or email */}
    <PersonAddIcon sx={{ marginRight: '10px', marginBottom: '5px' }} />
    <TextField
      id="standard-basic"
      variant="standard"
      autoFocus
      margin="dense"
      label="Username or email"
      fullWidth
      onChange={handleUsernameChange}
    />
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
    <Typography>
      Can user edit note:
    </Typography>
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  </Box>
</DialogContent>
      <DialogActions sx={{ backgroundColor: "#EDEDED" }}>
        {/* Cancel and Save buttons */}
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserToNote;

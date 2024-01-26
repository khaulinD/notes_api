import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Link from "@mui/material/Link";
import {BASE_URL} from '../../config';
import { useEffect, useState } from "react";
import { useAuthService } from "../../services/AuthServices.ts";
import useAxiosWithJwtInterceptor from "../../helper/jwtinterseptor.ts";
import FeedbackIcon from '@mui/icons-material/Feedback';
interface UserInfo {
  logo: string;
  email: string;
  username: string;
}

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const user_id = localStorage.getItem("user_id");
  // const { getUserInfo } = useAuthServiceContext();
  const jwtAxios = useAxiosWithJwtInterceptor()
  useEffect(() => {
  const getUserInformation = async () => {
    try {
      const response = await jwtAxios.get(`${BASE_URL}/accounts/?user_id=${Number(user_id)}`);
        const userData = response.data[0]; // Assuming the first user data is what you need
      setUserInfo(userData);
      sessionStorage.setItem('userInfo', JSON.stringify(userData));
      console.log("get_user:",userData)

    } catch (err: any) {
      console.log("error getting data", err)
      logout()
    }
  }

  if (user_id) {
    const userInfoFromStorage = sessionStorage.getItem("userInfo");
    if (userInfoFromStorage) {
      const userInfoObject: UserInfo = JSON.parse(userInfoFromStorage);
      setUserInfo(userInfoObject);
    } else {
      getUserInformation();
    }
  }
}, [user_id]);

//   useEffect(() => {
//     const getUserInformation = async () => {
//   try {
//     const response = await jwtAxios.get(`${BASE_URL}/accounts/?user_id=${Number(user_id)}`);
//     sessionStorage.setItem('userInfo', JSON.stringify(response.data[0]));
//     setUserInfo(response.data);
//   } catch (err: any) {
//     return err.response.status;
//   }
// }
//     const userInfoFromStorage = sessionStorage.getItem("userInfo");
//     if (userInfoFromStorage) {
//       const userInfoObject: UserInfo = JSON.parse(userInfoFromStorage);
//       setUserInfo(userInfoObject);
//     } else {
//       getUserInformation()
//     }
//       console.log(userInfo)
//
//   }, [user_id]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useAuthService();

  return (
    <React.Fragment>
     <Tooltip title="Account settings">
  <IconButton
    onClick={handleClick}
    size="small"
    sx={{ ml: 2, mt: -1 }}
    aria-controls={open ? 'account-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
  >
    {userInfo !== null && userInfo.logo ? (
        <Avatar src={`${BASE_URL}${userInfo.logo}`} alt="user_logo" />
      ) : (
        <Avatar />
      )}
  </IconButton>
</Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link href="/login">
          <MenuItem onClick={handleClose}>
            My account
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Link href="/feedback">
        <MenuItem  onClick={handleClose}>
          <ListItemIcon>
            <FeedbackIcon fontSize="small" />
          </ListItemIcon>
          FeedBack
        </MenuItem>
          </Link>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

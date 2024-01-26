import {
    Box, Link,
    Typography,
} from "@mui/material";
import "./styles/SideBar.css"
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import React, {useEffect, useState} from "react";
type Props = {
  open: boolean;
  setSideBar: (open: boolean) => void;
};

const SideBar: React.FC<Props> = ({ open,setSideBar  }) => {
    // const [notesOpen, setNotesOpen] = useState(false)
    // const [reminderOpen, setReminderOpen] = useState(false)
    // const [basketOpen, setBasketOpen] = useState(false)
    const [currentURL, setCurrentURL] = useState(window.location.href);
    const [hovering, setHovering] = useState(false);
    useEffect(() => {
        const currentURL = window.location.href;
        const parts = currentURL.split("/"); // Разбиваем URL по символу '/'
        const lastPart = parts[parts.length - 1]; // Получаем последнюю часть
        setCurrentURL(`/${lastPart}`)

  }, []);
    const [menuItems] = useState([
    { title: "Notes", url: "/" , icon: EmojiObjectsOutlinedIcon },
    { title: "Notification", url: "/notification", icon: NotificationsNoneOutlinedIcon },
    { title: "Sharing Notes", url: "/sharingnotes", icon: GroupAddOutlinedIcon },
    { title: "Basket", url: "/basket" , icon: DeleteOutlinedIcon },
    // Добавьте другие пункты меню здесь
  ]);
    const handleBlockHover = () => {
    // Измените значение параметра open при наведении
    open = !open
  };
    let openTimeout: number | undefined;
      const handleSideBarHover = () => {
    openTimeout = window.setTimeout(() => {
      setSideBar(true);
    }, 700); // Задержка в 1 секунду
  };

  const handleSideBarLeave = () => {
    if (openTimeout) {
      window.clearTimeout(openTimeout);
      openTimeout = undefined;
    }
    if (hovering) {
      setHovering(false);
    } else {
      setSideBar(false);
    }
  };


  return (
   <Box  onMouseEnter={handleSideBarHover} onMouseLeave={handleSideBarLeave}>
      <Box
        onMouseEnter={handleBlockHover}
        sx={{
          transition: "width 0.3s",
          height: 50,
          width:open ? "280px" : "68px"

        }}
      >

          {menuItems.map((menuItem, index) => (
        <Link key={index} sx={{cursor:"pointer"}} color="inherit" underline="none" href={menuItem.url} >
          <Box
            className={open ? "SideBarElementsOpen" : "SideBarElementsClose"}
            sx={{
              backgroundColor: menuItem.url === currentURL ? "#FEEFC3" : "white",
                "&:hover": {
                backgroundColor: menuItem.url !== currentURL ? "#e8e8e8" : "#FEEFC3",
              }
            }}
          >
            {React.createElement(menuItem.icon, { sx: { fontSize: 30} })}
            <Typography
              className="SideBarElementsText"
              variant="h6"
              component="h5"
              sx={{ display: open ? "block" : "none", textWrap:"nowrap" }}
            >
              {menuItem.title}
            </Typography>
          </Box>
        </Link>
      ))}


      </Box>

    </Box>

  );
};
export default SideBar;
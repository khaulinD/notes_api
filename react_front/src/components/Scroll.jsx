import React, { useEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const ScrollContainer = styled(Box)(() => ({
  height: `calc(100% - 150px)`,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    height: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    // backgroundColor: "#f0f0f0",
  },
  "&::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
}));

function Scroll({ children }) {
  const scrollRef = useRef(null);

  // const scrollToBottom = useCallback(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //   }
  // }, []);

  // useEffect(() => {
  //   // scrollToBottom();
  // }, [children]);

  return <ScrollContainer sx={{marginTop:"20px",marginBottom:"20px"}} ref={scrollRef}>{children}</ScrollContainer>;
}

export default Scroll;

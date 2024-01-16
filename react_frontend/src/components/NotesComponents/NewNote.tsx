import React, { useState } from "react";
import { Box, Paper, TextField, IconButton, Typography, ClickAwayListener } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import sendDataToServer  from "./sendNote.ts"
import useAxiosWithJwtInterceptor from "../../helper/jwtinterseptor.ts";


const NewNote = ({onAddNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [fullAdd, setFullAdd] = useState(false);
  const jwtAxios = useAxiosWithJwtInterceptor()
  const handleAddNote = () => {

    if (text.trim() !== "") {
      sendDataToServer(title,text,jwtAxios)
        // addDataToDictionary(title, text);
       onAddNote(title, text);
      setTitle("");
      setText("");
    }
    setFullAdd(false);
  };

  const openFullNoteContext = () => {
    setFullAdd(true);
  };

  const handleClickAway = () => {
    setFullAdd(false);
  };

  const handleClearInput = () => {
    setTitle("");
    setText("");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2,marginBottom:"40px" }}>
      <ClickAwayListener onClickAway={handleAddNote}>
        <Paper elevation={3} sx={{ width: "668px", padding: 2 }}>
          {fullAdd && <Box>
            <TextField
                sx={{marginBottom:"10px"}}
              label="Title"
              variant="standard"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onClick={openFullNoteContext}
            />
          </Box>}

          <TextField
            label="Text"
            multiline={fullAdd}
            rows={fullAdd ? 2 : 1}
            variant="standard"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            onClick={openFullNoteContext}
          />
          {fullAdd && (
            <Box sx={{ height: "20px", display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
              <IconButton onClick={handleAddNote}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => {
                handleClearInput(); // Очистка инпутов при нажатии на CloseIcon
                handleClickAway();
              }}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </Paper>
      </ClickAwayListener>
    </Box>
  );
};
export default NewNote;
// const App = () => {
//   const [notes, setNotes] = useState<{ title: string; text: string }[]>([]);
//
//   const handleAddNote = (title: string, text: string) => {
//     setNotes([...notes, { title, text }]);
//   };
//
//   return (
//     <div>
//       <Typography variant="h5" align="center" mt={2}>
//         Google Keep
//       </Typography>
//       <NewNote onAddNote={handleAddNote} />
//       <Box mt={2}>
//         {notes.map((note, index) => (
//           <Paper key={index} elevation={3} sx={{ width: 400, padding: 2, marginBottom: 2 }}>
//             <Typography variant="h6">{note.title}</Typography>
//             <Typography>{note.text}</Typography>
//           </Paper>
//         ))}
//       </Box>
//     </div>
//   );
// };
//
// export default App;

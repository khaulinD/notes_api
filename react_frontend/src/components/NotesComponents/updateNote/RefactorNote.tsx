import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import {updateNote} from "../../requests/request_to_db.ts";
import useAxiosWithJwtInterceptor from "../../../helper/jwtinterseptor.ts";

interface RefactorNoteProps {
  title: string;
  text: string;
  sql_index:number
  open: boolean;
  onClose: () => void;
  onSave: (updatedTitle: string, updatedText: string) => void;
}

const RefactorNote: React.FC<RefactorNoteProps> = ({ title, text, sql_index, open, onClose, onSave }) => {
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedText, setUpdatedText] = useState(text);
  const jwtAxios = useAxiosWithJwtInterceptor();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };

  const handleSave = async () => {
    onSave(updatedTitle, updatedText);
    await updateNote(updatedTitle, updatedText, sql_index, jwtAxios);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редактировать заметку</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Заголовок"
          fullWidth
          value={updatedTitle}
          onChange={handleTitleChange}
        />
        <TextField
          margin="dense"
          label="Текст заметки"
          fullWidth
          multiline
          rows={4}
          value={updatedText}
          onChange={handleTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSave}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RefactorNote;
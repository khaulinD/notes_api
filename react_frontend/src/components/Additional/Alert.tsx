import React from "react";
import {Alert, Snackbar, Stack} from "@mui/material";

export default function CustomizedSnackbars({ type }:{ type: number }) {
  const [openError, setOpenError] = React.useState(false);
  const [openWarning, setOpenWarning] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [text, setText] = React.useState("")

  React.useEffect(() => {
    switch (type){
        case 400:

          setOpenError(true);
          break; // Add break statement to prevent fallthroughswitch (type){
        case 403:
            setText("Forbidden")
            setOpenError(true);
          break; // Add break statement to prevent fallthroughswitch (type){
        case 401:

          setText("Unauthorized")
          setOpenError(true);
          break; // Add break statement to prevent fallthrough
        case 409:
          setText("Data has already use")
          setOpenError(true);
          break; // Add break statement
        default:
          break; // Add break statement
      }
  }, [type]);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
    setOpenWarning(false);
    setOpenInfo(false);
    setOpenSuccess(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {text}
          </Alert>
        </Snackbar>
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          This is a warning message!
        </Alert>
      </Snackbar>
      <Snackbar open={openInfo} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          This is an information message!
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Stack>
  );
}

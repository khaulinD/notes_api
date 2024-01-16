import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {useAuthServiceContext} from "../../context/AuthContext.tsx";
const EmailVerification = ({openWindow}) =>{
    const {check_email_verify} = useAuthServiceContext()

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
     React.useEffect(() => {
          setOpen(openWindow);
      }, [openWindow]);

    const handleCheckEmail = async () =>{
        const email_data = await check_email_verify(localStorage.getItem("user_id"))
    }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <Box >
            <Button sx={{backgroundColor:"white"}} onClick={handleCheckEmail}>
                Check email
            </Button>
        </Box>
      </Backdrop>
    </div>
  );
}

export default  EmailVerification
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuthServiceContext} from "../context/AuthContext.tsx";
import CustomizedSnackbars from "../components/Additional/Alert.tsx";
import {useState} from "react";
import EmailVerification from "../components/RegisterComponent/EmailVerification.tsx";
import {Backdrop, CircularProgress } from '@mui/material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
  const {register} = useAuthServiceContext()
  const [ alertCode, setAlertCode] = useState(0)
  const [ verificationOpen, setVerificationOpen] = useState(false)
  const [ loadOpen, setloadOpen] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  const password = data.get('password');
  const username = data.get("username");
  const firstName = data.get("firstName");
  const secondName = data.get("lastName");
    if (username!= null){
      setloadOpen(true)
      // @ts-ignore
      const status = await register(username, password, email, firstName, secondName);
      switch (status){
        case 400:
          setloadOpen(false)
          setAlertCode(400);
          break; // Add break statement to prevent fallthrough
        case 409:
          setloadOpen(false)
          setAlertCode(409);
          break; // Add break statement
        default:
          setVerificationOpen(true)
          setloadOpen(false)
          break; // Add break statement
      }
    }


  // try {
  //   if (username!= null){
  //     // const status = await register(username, password, email, firstName, secondName);
  //     // if (status ===409 ){
  //     //   setAlertCode(409);
  //     //
  //     // }else{
  //       setVerificationOpen(true)
  //     // }
  //   }
  //   // Успешная регистрация, перенаправьте пользователя на другую страницу
  // } catch (error) {
  //   if (error.response && error.response.status === 409) {
  //     // Обработка конфликта (например, отображение сообщения об ошибке о дублирующих данных)
  //     console.error('Пользователь с такими данными уже существует.');
  //   } else {
  //     // Обработка других ошибок
  //     console.error('Произошла ошибка при регистрации.');
  //   }
  // }
  // console.log({
  //   email: data.get('email'),
  //   password: data.get('password'),
  //   username: data.get("username"),
  //   firstName: data.get("firstName"),
  //   secondName: data.get("lastName"),
  // });
};

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const username = data.get('email');
  //   const password = data.get('password');
  //
  //   if (typeof username === 'string' && typeof password === 'string') {
  //     const status = await login(username, password);
  //   } else {
  //     console.error('Invalid username or password');
  //   }
  // };



  return (

    <ThemeProvider theme={defaultTheme}>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <EmailVerification openWindow={verificationOpen}/>
      <CustomizedSnackbars type={alertCode} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
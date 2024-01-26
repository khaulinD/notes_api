import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../config.ts";
import {AuthServiceProps} from "../@types/auth-service";


export function useAuthService(): AuthServiceProps {
  const navigate = useNavigate();

  const getInitialLoggedInValue = () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    return loggedIn !== null && loggedIn === "true";
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getInitialLoggedInValue());
  const  getUserInfo = async (user_id: number) => {
  try {
    // const token = access_token; // Замените на действительный JWT токен пользователя
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      withCredentials: true,
    };
    const response = await axios.get(`${BASE_URL}/accounts/?user_id=${user_id}`, config);
    console.log(response.data);
    return response.data;
  } catch (err: any) {
    return err.response.status;
  }
};

  const login = async (username: string, password: string): Promise<number | void> => {
    try {
      const response = await axios.post(
        `${BASE_URL}/token/`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
        console.log(response)
      const user_id = response.data.user_id;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("email_verify", response.data.is_verified);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      setIsLoggedIn(true);
      // getUserInfo(user_id)
      // Redirect to a new route after successful login
        if (response.data.is_verified){
            navigate("/");
        }
        // else{
        //     await check_email_verify(user_id);
        // }

    } catch (err: any) {
       if (err.response.status === 403){
          console.log("verify email or create account")
       }
      return err.response.status;
    }
  };
  const logout = async () => {
        setIsLoggedIn(false);
        navigate("/login")

        try {
            await axios.post(
                `${BASE_URL}/accounts/logout/`, {refresh_token:localStorage.getItem('refresh_token')} , {withCredentials:true}
            )
            localStorage.setItem("isLoggedIn", "false")
            localStorage.removeItem("user_id")
            localStorage.removeItem("email_verify")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("access")

            sessionStorage.clear()
        } catch (refreshError) {
            localStorage.clear()
            sessionStorage.clear()
            setIsLoggedIn(false);
            navigate("/login")
            return Promise.reject(refreshError)
        }

  }
  interface LoginResponse {
  user_id: string;
  is_verified: boolean;
  access: string;
  refresh: string;
}
const register = async (
  username: string,
  password: string,
  email: string,
  firstName: string,
  secondName: string
): Promise<number> => {
  try {
    const registerResponse = await axios.post(
      `${BASE_URL}/accounts/register/`,
      { username, password, email, firstName, secondName },
      { withCredentials: true }
    );

    const loginResponse = await axios.post<LoginResponse>(
      `${BASE_URL}/token/`,
      { username, password },
      { withCredentials: true }
    );

    const { user_id, is_verified, access, refresh } = loginResponse.data;

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('email_verify', is_verified.toString());
    localStorage.setItem('access', access);
    localStorage.setItem('refresh_token', refresh);

    setIsLoggedIn(true);

    if (registerResponse.status === 201) {
      console.log('Registration successful');
      // Redirect or perform necessary actions upon successful registration
    } else {
      navigate('/login');
    }

    return registerResponse.status;
  } catch (err: any) {
    console.error('Registration error:', err);
    return err.response.status;
  }
};

const check_email_verify = async (user_id: string) =>{
      try {
        // const token = access_token; // Замените на действительный JWT токен пользователя
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          withCredentials: true,
        };
        const response = await axios.get(`${BASE_URL}/accounts/?user_id=${user_id}`, config);
        console.log(response.data[0].is_verified);
        if (response.data[0].is_verified){
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
            localStorage.setItem("email_verify", "true")

            navigate("/")
            return response.data;
        }else{
            return response.status
        }
      } catch (err: any) {
          console.log("verified error")
        return err.response.status;
      }
};

  // @ts-ignore
    return { login, logout, isLoggedIn, getUserInfo, register, check_email_verify};
}

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "../services/AuthServices.ts";

const useAxiosWithJwtInterceptor = () => {
  const jwtAxios = axios.create({});
  const navigate = useNavigate();
  const { logout } = useAuthService();

  jwtAxios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access"); // Получение access токена из localStorage

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Добавление access токена в заголовок
    }
    return config;
  });

  jwtAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 || error.response.status === 403) {
        try {
          console.log("ds")
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",{
              refresh:localStorage.getItem('refresh_token')
              }

          );

          if (response.status === 200) {
            localStorage.setItem("access", response.data.access)
            return jwtAxios(originalRequest);
          }
        } catch (refreshError) {
          logout();
          const goLogin = () => navigate("/login");
          goLogin();
          return Promise.reject(refreshError);

        }
      }
    }


  );

  return jwtAxios;
};

export default useAxiosWithJwtInterceptor;

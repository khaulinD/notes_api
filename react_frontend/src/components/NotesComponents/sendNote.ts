// import axios from 'axios';
import {BASE_URL} from "../../config.ts";
// import useAxiosWithJwtInterceptor from "../../helper/jwtinterseptor.ts";
async function sendDataToServer(title: string, text: string,jwt:any) {

  // Замените URL на адрес вашего сервера или API
  const url = `${BASE_URL}/notes/`;
  const user_id = localStorage.getItem("user_id")
  // Замените на те данные, которые вы хотите отправить
  const data = { title: title, text: text, creator: user_id };

  try {
    const response = await jwt.post(url, data);
    console.log(response)
    if (response.status === 201) {
      console.log('Успешно отправлено:', response.data);
      return response.data.data
    } else {
      console.error('Ошибка при отправке:', response.statusText);
    }

  } catch (error) {
    console.error('Ошибка при отправке:', error);
    return error
  }
}

export default sendDataToServer
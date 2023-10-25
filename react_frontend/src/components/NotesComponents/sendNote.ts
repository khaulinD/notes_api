import axios from 'axios';
import {BASE_URL} from "../../config.ts";
async function sendDataToServer(title: string, text: string) {
  // Замените URL на адрес вашего сервера или API
  const url = `${BASE_URL}notes/`;

  // Замените на те данные, которые вы хотите отправить
  const data = { title: title, text: text, creator: 1 };

  try {
    const response = await axios.post(url, data);

    if (response.status === 200) {
      console.log('Успешно отправлено:', response.data);
    } else {
      console.error('Ошибка при отправке:', response.statusText);
    }
    return true
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    return false
  }
}

export default sendDataToServer
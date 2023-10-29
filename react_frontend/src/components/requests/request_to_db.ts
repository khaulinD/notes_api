import axios from "axios";
import {BASE_URL} from "../../config.ts";

export async function fetchContent(content:string,basket_check:boolean) {
      try {
        const response = await axios.get(`${BASE_URL}${content}/?is_in_basket=${basket_check}`);
        const data = response.data;

        return data

      } catch (error) {
        console.error("Ошибка при выполнении GET-запроса:", error);
      }

    }

export async function fetchContentWithTitle(content:string, searchText:string,basket_check:boolean) {
      try {
        let response;

        if (!searchText) {
          response = await axios.get(`${BASE_URL}notes/?is_in_basket=${basket_check}`);
        } else {
          response = await axios.get(`${BASE_URL}${content}/?is_in_basket=${basket_check}&text=${searchText}`);
        }

        const data = response.data;
        return data
      } catch (error) {
        console.error("Ошибка при выполнении GET-запроса:", error);
      }
    }
export const updateIsInBasket = async (noteId:number, isInBasket:boolean) => {
    await axios.put(`${BASE_URL}notes/${noteId}/`, { is_in_basket: isInBasket, creator:1 })
    .then(response => {
      // Здесь можно обновить состояние в React, чтобы отразить изменения на клиентской стороне
      console.log('Изменения успешно сохранены.');
    })
    .catch(error => {
      console.error('Ошибка при изменении is_in_basket:', error);
    });
};
export const deleteSomeNote = async (noteId:number) => {
  await axios.delete(`${BASE_URL}notes/${noteId}/`)
    .then(response => {
      // Здесь можно обновить состояние в React, чтобы удалить заметку из интерфейса
      console.log('Заметка успешно удалена.');
    })
    .catch(error => {
      console.error('Ошибка при удалении заметки:', error);
    });
};

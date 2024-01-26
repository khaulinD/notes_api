
import {BASE_URL} from "../../config.ts";
import {useNavigate} from "react-router-dom";


       // let   number_of_tries =0;
       // const max_tries =3;
export async function fetchContent(content:string,basket_check:boolean, jwt:any) {

        const user_id = localStorage.getItem("user_id")
      try {
        const response = await jwt.get(`${BASE_URL}/${content}/?is_in_basket=${basket_check}&creator=${user_id}`);
          console.log(`${BASE_URL}/${content}/?is_in_basket=${basket_check}&creator=${user_id}`)
        const data = response.data;
          console.log(data)
        return data

      } catch (error:any) {
       const navigate = useNavigate();
        console.error("Ошибка при выполнении GET-запроса:", error);
        navigate("/login")
      }
    }

export async function fetchContentWithTitle(content:string, searchText:string,basket_check:boolean,jwt:any) {
    const user_id = localStorage.getItem("user_id")
      try {
        let response;

        if (!searchText) {
          response = await jwt.get(`${BASE_URL}/notes/?is_in_basket=${basket_check}&creator=${user_id}`);
        } else {
          response = await jwt.get(`${BASE_URL}/${content}/?is_in_basket=${basket_check}&text=${searchText}&creator=${user_id}`);
        }

        const data = response.data;
        return data
      } catch (error) {
        console.error("Ошибка при выполнении GET-запроса:", error);
      }
    }
export const updateIsInBasket = async (noteId:number, isInBasket:boolean,jwt:any) => {

    const user_id = localStorage.getItem("user_id")
    try {
        const response = await jwt.put(`${BASE_URL}/notes/${noteId}/`, {is_in_basket: isInBasket, creator: user_id})
        // Здесь можно обновить состояние в React, чтобы отразить изменения на клиентской стороне
        console.log('Изменения успешно сохранены.', response);
        return response.status
    } catch(error: any)  {
      console.error('Ошибка при изменении is_in_basket:', error);
      return error
    };
};
export const deleteSomeNote = async (noteId:number,jwt:any) => {
  await jwt.delete(`${BASE_URL}/notes/${noteId}/`)
    .then(() => {
      // Здесь можно обновить состояние в React, чтобы удалить заметку из интерфейса
      console.log('Заметка успешно удалена.');
    })
    .catch((error: any) => {
      console.error('Ошибка при удалении заметки:', error);
    });
};

export const updateNote = async (title:string, text:string, index:number, jwt:any)=>{
    const user_id = localStorage.getItem("user_id")
    await jwt.put(`${BASE_URL}/notes/${index}/`, {title:title, text:text, creator:user_id })
    .then(() => {
      // Здесь можно обновить состояние в React, чтобы отразить изменения на клиентской стороне
      console.log('Изменения успешно сохранены. изменении notes');
    })
    .catch((error: any) => {
      console.error('Ошибка при изменении notes:', error);
    });
}

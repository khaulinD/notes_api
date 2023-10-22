import React, { useEffect, useState } from "react";
import axios from "axios";

interface Note {
  id: number;
  title: string;
}
const Home = () => {

   const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Функция для выполнения GET-запроса при монтировании компонента
    async function fetchNotes() {
      try {
        // Выполняем GET-запрос по указанному URL
        const response = await axios.get("http://127.0.0.1:8000/notes/");

        // Извлекаем данные из ответа
        const data = response.data;

        // Обновляем состояние с полученными данными
        setNotes(data);
      } catch (error) {
        console.error("Ошибка при выполнении GET-запроса:", error);
      }
    }

    // Вызываем функцию для выполнения запроса
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Заметки</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home
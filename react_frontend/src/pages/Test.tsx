// import { useEffect, useState } from "react";
// import Scroll from "../components/Scroll.tsx";
//
// const Test = () => {
//     const [responseData, setResponseData] = useState<any>("");
//     const user_id = localStorage.getItem("user_id")
//     // const ws = useRef<WebSocket | null>(null);
//
//     // const buttonHandlers = () => {
//     //     if (ws) {
//     //         ws.send(JSON.stringify({
//     //             action: "list",
//     //             request_id: new Date().getTime()
//     //         }));
//     //     }
//     // };
//     // const room_pk = "1";
//     // const request_id = new Date().getTime()
//     // console.log(room_pk)
//     // console.log(request_id)
//     // console.log("request", '{{request}}')
//     // useEffect(() => {
//     //     // ws.current = new WebSocket('ws://127.0.0.1:8000/ws/note/');
//     //     const ws = new WebSocket('ws://127.0.0.1:8000/ws/note/');
//     //     ws.onopen = () =>{
//     //         console.log('Connected to WebSocket');
//     //         ws.send(JSON.stringify({
//     //             action: "list",
//     //             data:Number(user_id),
//     //             request_id: new Date().getTime()
//     //         }));
//     //         // ws.send(
//     //         // JSON.stringify({
//     //         //     pk: room_pk,
//     //         //     action: "join_room",
//     //         //     request_id: request_id,
//     //         // })
//     //     // );
//     //     }
//     //
//     //     ws.onmessage = function (e) {
//     //         const textContent = JSON.stringify(JSON.parse(e.data), undefined, 2);
//     //         setResponseData(textContent);
//     //
//     //     };
//     //
//     //     return () => {
//     //         if (ws) {
//     //             ws.close();
//     //         }
//     //     };
//     // }, []);
//
//     useEffect(() => {
//         const ws = new WebSocket('ws://127.0.0.1:8000/ws/note/');
//         ws.onopen = function (){
//             console.log('Connected to WebSocket');
//             ws.send(JSON.stringify({
//                 action:"list",
//                 user:Number(user_id),
//                 request_id: new Date().getTime()
//             }))
//
//         }
//
//         ws.onmessage = function (e) {
//             const allData = JSON.parse(e.data);
//             if (allData.action =="list"){
//                 // setResponseData(allData.data)
//                 console.log(allData.data)
//             }
//             else if (allData.action =="create"){
//                 console.log(allData.data)
//             }
//             else if (allData.action =="update"){
//                 console.log(allData.data)
//             }
//
//         }
//
//
//         ws.onclose = () => {
//           console.log('WebSocket connection closed');
//         };
//
//         return () => {
//           console.log('Closing WebSocket connection...');
//           ws.close();
//         };
//     }, []);
//
//     return (
//         <>
//             {/*<button onClick={buttonHandlers}>List</button>*/}
//             <Scroll>
//             <pre>{responseData}</pre>
//                 </Scroll>
//         </>
//     );
// };
//
// export default Test;

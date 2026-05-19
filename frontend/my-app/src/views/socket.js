import { io } from "socket.io-client";
const apiBase = process.env.REACT_APP_API_URL;
const socket = io(apiBase,{
});
export default socket;
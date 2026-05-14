import { io } from "socket.io-client";
const socket = io("http://localhost:8244",{
});
export default socket;
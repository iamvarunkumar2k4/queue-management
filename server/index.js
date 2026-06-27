const express=require('express');
const app=express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const {createServer}=require('http');
app.use(cors());
const { Server } = require("socket.io");
// const PORT = process.env.PORT || 5000;
const PORT=process.env.PORT;
const mongoose=require('mongoose');  
console.log("MONGO URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected',()=>{
  console.log("database connected succesfully");
})
mongoose.connection.on('error',(error)=>{
  console.log("error "+error);
})
const httpServer = createServer(app);
require('./models/sessiondata');
require('./models/user');
app.use(express.json());
app.use(require('./routes/session'));
app.use(require('./routes/auth'))
const io = new Server(httpServer,{
  cors: {
    origin:process.env.FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("new user connected");
  console.log("socket id ",socket.id);
  socket.on('join_session',(session_id)=>{
    socket.join(session_id);
    console.log("joined session"+session_id);
  })
});
app.set("io", io);
httpServer.listen(PORT,()=>{
  console.log("server has started");
})


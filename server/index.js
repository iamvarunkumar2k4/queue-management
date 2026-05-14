const express=require('express');
const app=express();
const cors = require("cors");
const {createServer}=require('http');
app.use(cors());
const { Server } = require("socket.io");
const port=8244;
const mongoose=require('mongoose');  

mongoose.connect('mongodb://localhost:27017/');
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
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("new user connected");
  console.log("socket id ",socket.id);
  socket.on('join_session',(id_session)=>{
    socket.join(id_session);
  })
});
app.set("io", io);
httpServer.listen(port,()=>{
  console.log("server has started");
})


const express=require('express');
const app=express();
const port=8244;
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/management');
mongoose.connection.on('connected',()=>{
  console.log("database connected succesfully");
})
mongoose.connection.on('error',(error)=>{
  console.log("error "+error);
})
require('./models/sessiondata');
require('./models/user');
app.use(express.json());
app.use(require('./routes/session'));
app.use(require('./routes/auth'))
app.listen(port,()=>{
  console.log("server has started");
})
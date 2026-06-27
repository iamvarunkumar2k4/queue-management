const mongoose=require('mongoose');
const userschema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  createdSessions:[
    { title: { type: String }, createdAt: { type: String } }
  ],
  joinedSessions:[
    { title: { type: String }, joinedAt: { type: String } }
  ],
  created:{
    type:String,
    default:null
  },
  joined:{
    type:String,
    default:null
  },
  trytojoined:{
    type:String,
    default:null
  },
  joinedAt:
  {
    type:String
  },
  status:{
    type:String,
    default:"none"
  },
  history:[
    {item:{type:String}}
  ]
}
);

module.exports=mongoose.model("User",userschema);

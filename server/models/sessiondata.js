const mongoose=require('mongoose');
const sessionschema= new mongoose.Schema({
  createdBy:{
    type:String,
    required:true
  },
  sessionName:{
     type:String,
    required:true
  },
  isActive:{
    type:Boolean,
    default:true,
  },
  description:{
     type:String,
    required:true
  },
  uers:[
    {
      type:String,
    }
  ]
},
{
  collection: "sessions"
}
);

module.exports=mongoose.model("Session",sessionschema);

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
  created:[{
    type:String
  }],
  joined:[
    {
      type:String
    }
  ]
}
);

module.exports=mongoose.model("User",userschema);

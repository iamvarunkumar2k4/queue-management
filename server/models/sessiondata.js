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
  createdAt:{
    type:String
  },
  whocanjoin:{
    type:String,
  },
  users:[
    {
      user_id:{
        type:String
      }
    }
  ],
  pendingusers:[
    {
      name:{
      type:String
      },
      user_id:{
        type: String,
      },
      email:{
        type:String
      }
    }
  ]
});

module.exports=mongoose.model("Session",sessionschema);

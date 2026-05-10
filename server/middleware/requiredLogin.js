const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../routes/key')
const mongoose=require('mongoose');
const User=mongoose.model('User');


module.exports=(req,res,next)=>{
  console.log(req.headers.authorization);
  const { authorization }=req.headers;
  if(!authorization)
  {
    return res.status(401).json({error:"you must be logged in"});
  }
  const token=authorization.replace("Bearer ","");
  jwt.verify(token,JWT_SECRET,(err,payload)=>{
    if(err){
      return res.status(401).json({error:"you must be logged in"});
    }
    console.log(payload);
    const {_id}=payload;
    User.findOne({_id}).then(userdata=>{
      req.user=userdata;
      console.log(req.user);
      next();
    })
    .catch(err => {
        console.log(err);
         return res.status(500).json({
         error: "Server error"
    });
    });
  })
}
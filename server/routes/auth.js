const { default: mongoose } = require("mongoose");

const exprress=require('express');
const router=exprress.Router();
const User=mongoose.model('User');

router.post('/signup',(req,res)=>{
  const {name,email,password} = req.body;
   if(!name || !email || !password)
  {
    return res.status(422).json({error:"please add all fields"});
  }
  const user =new User({
    name,
    email,
    password
  })
  user.save().then(result=>{
    res.json({post:result})
  }).catch(error=>{
    console.log(error);
  })
})

module.exports=router;
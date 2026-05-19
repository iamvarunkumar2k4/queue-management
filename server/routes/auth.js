const { default: mongoose } = require("mongoose");
const bcrypt=require('bcrypt');
const exprress=require('express');
const router=exprress.Router();
const User=mongoose.model('User');
const jwt=require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


router.post('/signup',(req,res)=>{
  const {name,email,password}=req.body;
  if(!email || !password || !name)
  {
    return res.status(422).json({error:"please add all the fields"});
  }
  User.findOne({email:email}).then((saveduser)=>{
    if(saveduser){
      return res.status(422).json({error:"user already existed"});
    }
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
      console.log(hashedpassword);
        const user=new User({
        email,
        name,
        password:hashedpassword.toString()
      })
      user.save().then(user=>{
      return res.json({message:"saved successfully"})
      })
      .catch(error=>{
        console.log(error);
      })
    })
    .catch(error=>{
      console.log(error);
      return res.status(500).json({
    error:"Something went wrong"})
    })
  })
})

router.post('/signin',(req,res)=>{
  const {email,name,password}=req.body;
  if(!email || !password)
  {
    return res.status(422).json({error:"please provide email and password"});
  }
  User.findOne({email:email})
  .then(saveduser=>{
    if(!saveduser)
    {
      return res.status(422).json({error:"invalid email or invalid password"});
    }
    bcrypt.compare(password,saveduser.password)
    .then(domatch=>{
      if(domatch)
      {
        const token = jwt.sign({_id:saveduser._id}, JWT_SECRET, {expiresIn:'2d'});
        const {_id,name,email}=saveduser;
        return res.json({ token,user:{_id,name,email}});
      }
      else
      {
        return res.status(422).json({error:"invalid email or invalid password"});
      }
    })
    .catch(error=>{
      console.log(error);
      return res.status(500).json({
    error:"Something went wrong"})
    })
  })
})

module.exports=router;
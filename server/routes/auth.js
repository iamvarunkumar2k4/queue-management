const { default: mongoose } = require("mongoose");
const bcrypt=require('bcrypt');
const exprress=require('express');
const router=exprress.Router();
const User=mongoose.model('User');
const jwt=require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const requireLogin=require('../middleware/requiredLogin');
router.post('/signup',async(req,res)=>{
  try{
  const {name,email,password}=req.body;
  if(!email || !password || !name)
  {
    return res.status(422).json({error:"please add all the fields"});
  }
  const saveduser=await User.findOne({email:email});
    if(saveduser){
      return res.status(422).json({error:"user already existed"});
    }
    
    const hashedpassword=await bcrypt.hash(password,12)
    const date=new Date();
    console.log(hashedpassword);
        const user=new User({
        email,
        name,
        password:hashedpassword,
        joinedAt:date.toLocaleDateString()
      })
      await user.save();
      return res.status(200).json({message:"saved successfully"});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
    error:"Something went wrong"})
  }
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
        const token = jwt.sign({_id:saveduser._id}, JWT_SECRET, {expiresIn:'7d'});
        const {_id,name,email}=saveduser;
        return res.status(200).json({ token,user:{_id,name,email}});
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
router.post('/deleteaccount',requireLogin,async(req,res)=>{
  try{
    const user_id=req.user._id;
    const { password } = req.body;
    if (!password) {
      console.log("Password is required");
      return res.status(400).json({ error: "Password is required" });

    }
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ error: "Invalid password" });
    }
    await User.findByIdAndDelete(user_id);
    await Document.deleteMany({ owner: user_id });
    return res.status(200).json({message:"Account deleted successfully"});
  } catch (err) {
    console.log("Error occurred while deleting account");
    return res.status(500).json({
      error:"Something went wrong"
    });
  }
});

module.exports=router;

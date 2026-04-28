const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const Session=mongoose.model("Session")
router.post('/createsession',(req,res)=>{
  const {createdBy,sessionName,description}=req.body;
  if(!sessionName || !description || !createdBy)
  {
    return res.status(422).json({error:"please add all fields"});
  }
  const session =new Session({
    createdBy,
    sessionName,
    description
  })
  session.save().then(result=>{
    res.json({post:result})
  }).catch(error=>{
    console.log(error);
  })
});
module.exports=router;
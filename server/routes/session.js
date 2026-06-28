const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const Session=mongoose.model("Session")
const User=mongoose.model('User');
const { nanoid } = require('nanoid');
const QRCode = require('qrcode');
const requireLogin=require('../middleware/requiredLogin');
const user = require('../models/user');

router.post('/createsession', requireLogin,async (req, res) => {
  try {
    const { sessionName, whocanjoin} = req.body;
    const user_id=req.user._id;
    const user=await User.findById(user_id);
    if(!user)
    {
      return res.status(400).json({message:"user not found"});
    }
    if (!sessionName || !whocanjoin) {
      return res.status(422).json({ error: "please add all fields" });
    }
    if(user.created)
    {
      return res.status(200).json({ error: "cannot create One session is still active"});
    }
    const date=new Date();
    const session = new Session({
      createdBy:user_id,
      sessionName,
      whocanjoin,
      joinedAt:date.toLocaleDateString()
    });
    await session.save();
    user.created = session._id.toString();
    await user.createdSessions.push({title:sessionName,createdAt:date.toLocaleDateString()});
    await user.save();
    console.log("created session");
    res.status(200).json({message:'created successfully',session_id:session._id});
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get('/cancreate',requireLogin,async(req,res)=>{
  try{
    const user_id=req.user._id;
    const user=await User.findById(user_id);
    if(!user.created)
    {
      return res.status(200).json({message:false});
    }
    const session_id=user.created;
    const match=await Session.findById(session_id);
    if(!match) return res.status(422).json({ error: "session not found" });
    return res.status(200).json({message:true,pendinglist:match.pendingusers,total:match.users.length});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post('/accept',requireLogin,async(req,res)=>{
  try{
    const {iuser_id}=req.body;
  if(!iuser_id)
  {
    return res.status(400).json({message:"requesting user id not entered"});
  }
  const ouser_id=req.user._id;
  const user=await User.findById(ouser_id);
  if(!user)
  {
    return res.status(400).json({message:"owner user not found"});
  }
  const session_id=user.created;
  const match=await Session.findById(session_id);
  if(!match)
  {
    return res.status(400).json({message:"session not found"});
  }
  const user2=await User.findById(iuser_id);
  if(!user2)
  {
    return res.status(400).json({message:"requesting user not found"});
  }
  // await Session.updateOne(
  //   {_id:session_id},
  //   { $push: { users: { user_id: iuser_id.toString() } } }
  // )
  match.users.push({user_id:iuser_id});
  user2.status="accepted";
  user2.joined=session_id;
  await Session.updateOne(
      { _id: session_id },
      { $pull: { pendingusers: { user_id: iuser_id.toString() } } }
    );
  await match.save();
  await user2.save();
  const updatedMatch=await Session.findById(session_id);
  const io = req.app.get("io");
  io.to(session_id).emit("data",updatedMatch.users);
  io.to(session_id).emit("status_changed",{user_id:user2._id,status:user2.status});
  return res.status(200).json({message:"added to session"});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})
router.post('/reject',requireLogin,async(req,res)=>{
  try{
    const {iuser_id}=req.body;
  if(!iuser_id)
  {
    return res.status(400).json({message:"requesting user id not entered"});
  }
  const ouser_id=req.user._id;
  const user=await User.findById(ouser_id);
  if(!user)
  {
    return res.status(400).json({message:"owner user not found"});
  }
  const session_id=user.created;
  const match=await Session.findById(session_id);
  if(!match)
  {
    return res.status(400).json({message:"session not found"});
  }
  const user2=await User.findById(iuser_id);
  if(!user2)
  {
    return res.status(400).json({message:"requesting user not found"});
  }
  // await Session.updateOne(
  //   {_id:session_id},
  //   { $push: { users: { user_id: iuser_id.toString() } } }
  // )
  user2.status="rejected";
  await Session.updateOne(
      { _id: session_id },
      { $pull: { pendingusers: { user_id: iuser_id.toString() } } }
    );
  await match.save();
  await user2.save();
  const io = req.app.get("io");
  io.to(session_id).emit("status_changed",{user_id:user2._id,status:user2.status});
  return res.status(200).json({message:"not added to session"});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.post('/joinsession', requireLogin,async (req, res) => {
  try {
    const {session_id} = req.body;
    const user_id=req.user._id;
    const date=new Date();
    if (!session_id) {
      return res.status(422).json({ error: "please add all fields" });
    }
    const user=await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    if(user.joined)
    {
      return res.status(404).json({ error: "cannot join new session already joined" });
    }
    const match = await Session.findById(session_id);
    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    else
    {
      if(user.history.length>6)
      {
        user.history.pop();
      }
      user.history.push({item:session_id});
      if(match.whocanjoin==="Anyone")
      {
        if (match.users.includes(user_id)) {
          return res.status(400).json({ msg: "Already joined" });
        }
        match.users.push({user_id:user_id});
        user.joinedSessions.push({title:match.sessionName,joinedAt:date.toLocaleDateString()});
        console.log("Pushing:", {
          title: match.title,
          joinedAt: date.toLocaleDateString()
        });
        user.joined=session_id.toString();
        user.status="accepted";
        const io = req.app.get("io");
        await match.save();
        await user.save();
        const updatedMatch = await Session.findById(session_id);
        io.to(session_id).emit("data", updatedMatch.users);
        io.to(session_id).emit("status_changed",{user_id:user._id,status:user.status});
        return res.status(200).json({ message: "Joined successfully"});
      }
      const find=await Session.findOne(
      { _id: session_id },
      { users: { user_id: user_id.toString() } }
      );
      if(!find)
      {
        return res.error(400).json({message:"already send request to join"});
      }
      match.pendingusers.push({name:user.name,user_id:user._id,email:user.email});
      console.log(match.pendingusers);
      user.status="pending";
      user.trytojoined=session_id;
      await user.save();
      await match.save();
      const updatedMatch=await Session.findById(session_id);
      const io = req.app.get("io");
      io.to(session_id).emit("pending",updatedMatch.pendingusers);
      io.to(session_id).emit("status_changed",{user_id:user._id,status:user.status});
      return res.status(200).json({ message: "request pending"});
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post('/goback',requireLogin,async(req,res)=>{
  try{
     const user_id=req.user._id;
    const user=await User.findById(user_id);
    if(!user)
    {
      return res.status(200).json({message:"user not found"});
    }
    if(!user.joined)
    {
      return res.status(400).json({message:"user have not joined any session"});
    }
    const session_id=user.joined;
    user.joined=null;
    user.status="none";
    await user.save();
    const io = req.app.get("io");
    io.to(session_id).emit("status_changed",{user_id:user._id,status:user.status});
    console.log(user.status);
    return res.status(200).json({message:"ready to join new session"});
  }
  catch(err)
  {
    console.error(err);
    return res.status(500).json({ error: "Server error" }); 
  }
})

router.post('/gobackfromjoin',requireLogin,async(req,res)=>{
  try{
    const user_id=req.user._id;
    const user=await User.findById(user_id);
    if(!user)
    {
      return res.status(200).json({message:"user not found"});
    }
    if(!user.trytojoined)
    {
      return res.status(400).json({message:"user have not joined any session"});
    }
    const session_id=user.trytojoined;
    user.trytojoined=null;
    user.status="none";
    await user.save();
    const io = req.app.get("io");
    io.to(session_id).emit("status_changed",{user_id:user._id,status:user.status});
    console.log(user.status);
    return res.status(200).json({message:"ready to join new session"});
  }
  catch(err)
  {
    console.error(err);
    return res.status(500).json({ error: "Server error" }); 
  }
})
router.post('/leavesession', requireLogin, async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const session_id = user.joined;
    user.joined = null;
    user.status = "none";

    const match = await Session.findById(session_id);

    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }

    await Session.updateOne(
      { _id: session_id },
      { $pull: { users: { user_id: user_id.toString() } } }
    );

    const updatedMatch = await Session.findById(session_id);

    await user.save();

    const io = req.app.get("io");

    io.to(session_id).emit("data", updatedMatch.users);
    return res.status(200).json({ message: "session updated" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
router.get('/hasjoined',requireLogin,async(req,res)=>{
  try{
    const user_id=req.user._id;
    if(!mongoose.Types.ObjectId.isValid(user_id))
    {
      return res.status(422).json({ error: "user not found" });
    }
    const user=await User.findById(user_id);
    if(user.joined!==null)
    {
      return res.status(200).json({message:true});
    }
    return res.status(200).json({message:false});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get('/statusvalue',requireLogin,async(req,res)=>{
  try{
    const user_id=req.user._id;
    if(!mongoose.Types.ObjectId.isValid(user_id))
    {
      return res.status(422).json({ error: "user not found" });
    }
    const user=await User.findById(user_id);

    return res.status(200).json({status:user.status,history:user.history});
  }
  catch(err){
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})

router.post('/deletesession',requireLogin,async(req,res)=>{
  const user_id=req.user._id;
  const user=await User.findById(user_id);
  if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  const session_id=user.created;
  const io = req.app.get("io");
  const match=await Session.deleteOne({_id:session_id});
  if (!match)
  {
    return res.status(404).json({ error: "Session not found" });
  }
  io.to(session_id).emit("data",[]);
  const message="session have been deleted click goback to join other one";
  io.to(session_id).emit("message",message);
  user.created=null;
  await user.save();
  return res.status(200).json({message:"session deleted"});
})

router.post('/next', requireLogin,async (req, res) => {
  try {
    const user_id=req.user._id;
    const user=await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const session_id=user.created;
    if (!session_id) {
      return res.status(422).json({ error: "session not created" });
    }
    const match = await Session.findOne({_id:session_id});
    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    if(match.users.length===0)
    {
      return res.status(422).json({ error: "no user left in queue" });
    }
    const remove=match.users.shift();
    await match.save();
    const io = req.app.get("io");
    const removedid=remove.user_id;
    const removeduser=await User.findById(removedid);
    if(!removeduser)
    {
      return res.status(400).json({ error: "user has left the queue" });
    }
    const updatedMatch = await Session.findById(session_id);
    io.to(session_id).emit("data",updatedMatch.users);
    return res.status(200).json({ message: "user deleted", name:removeduser.name,email:removeduser.email});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get('/getqr',requireLogin,async(req,res)=>{
  try{
    const user_id=req.user._id;
    const session_id=(await User.findById(user_id)).created;
    const url = `${process.env.FRONTEND_URL}/joinsession?shortName=${session_id}`;
    const qrCode = await QRCode.toDataURL(url);
    return res.status(200).json({qrcode:qrCode});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
router.post('/myposition',requireLogin,async (req,res)=>{
  try {
    const user_id=req.user._id;  
    const session_id=(await User.findById(user_id)).joined;
    if (!session_id) {
      return res.status(422).json({ error: "not joined any session" });
    }
    const match = await Session.findById(session_id);
    
    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    let position=match.users.findIndex(user => user.user_id.toString() === user_id.toString());
    if (position === -1) {
      return res.status(404).json({ error: "User not in session" });
    }
    console.log(position);
    return res.status(200).json({ "position":position});

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})
router.post('/profile', requireLogin,async (req, res) => {
  try {
    const user_id= req.user._id;
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }
    const data = {
      name: user.name,
      email: user.email,
      joinedAt: user.joinedAt,
      createdsessions:user.createdSessions,
      joinedsessions:user.joinedSessions
    };
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});
module.exports=router;
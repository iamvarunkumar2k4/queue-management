const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const Session=mongoose.model("Session")
const requireLogin=require('../middleware/requiredLogin');
router.post('/createsession',(req,res)=>{
  try
  {
    const {createdBy,sessionName,description}=req.body;
    if(!sessionName || !description || !createdBy)
    {
      return res.status(422).json({error:"please add all fields"});
    }
    const session =new Session({
      createdBy,
      sessionName,
      description,
    })
    session.save().then(result=>{
      res.json({post:result})
    }).catch(error=>{
      console.log(error);
    })
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
router.post('/joinsession', async (req, res) => {
  try {
    console.log(req.body);
    const { id_user, id_session } = req.body;

    if (!id_user || !id_session) {
      return res.status(422).json({ error: "please add all fields" });
    }

    const match = await Session.findById(id_session);

    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    if (match.users.includes(id_user)) {
      return res.status(400).json({ msg: "Already joined" });
    }
    match.users.push(id_user);
    await match.save();
    return res.status(200).json({ message: "Joined successfully", data: match });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post('/next', async (req, res) => {
  try {
    const {id_session } = req.body;

    if (!id_session) {
      return res.status(422).json({ error: "please add all fields" });
    }

    const match = await Session.findById(id_session);

    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    match.users.shift();
    await match.save();
    const io = req.app.get("io");
    io.to(id_session).emit("data",match.users);
    return res.status(200).json({ message: "user deleted", data: match });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post('/myposition',async (req,res)=>{
  try {
    const { id_user, id_session } = req.body;

    if (!id_user || !id_session) {
      return res.status(422).json({ error: "please add all fields" });
    }

    const match = await Session.findById(id_session);

    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    let position=match.users.indexOf(id_user);
    return res.status(200).json({ "position":position+1});

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
})
module.exports=router;
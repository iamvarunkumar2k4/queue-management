const express=require('express');
const { default: mongoose } = require('mongoose');
const router=express.Router();
const Session=mongoose.model("Session")
const User=mongoose.model('User');

const QRCode = require('qrcode');
const requireLogin=require('../middleware/requiredLogin');
const abc=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 
  'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 
  'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
router.post('/createsession', requireLogin,async (req, res) => {
  try {
    const { createdBy, sessionName, description } = req.body;
    if (!sessionName || !description || !createdBy) {
      return res.status(422).json({ error: "please add all fields" });
    }
    let shortName = "";
    let match;
    do {
      shortName = ""; 
      for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * 52); 
        shortName += abc[x];
      }
      match = await Session.findOne({ shortName }); 
    } while (match); 
    const session = new Session({
      createdBy,
      sessionName,
      description,
      shortName
    });
    const result = await session.save();
    res.json({ post: result});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
router.post('/joinsession', requireLogin,async (req, res) => {
  try {
    console.log(req.body);
    const { id_user,shortName} = req.body;

    if (!id_user || !shortName) {
      return res.status(422).json({ error: "please add all fields" });
    }

    const match = await Session.findOne({shortName:shortName});
    const u=await User.findById(id_user);
    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    if (match.users.includes(id_user)) {
      return res.status(400).json({ msg: "Already joined" });
    }
    match.users.push(id_user);
    u.joined.push(shortName);
    await match.save();
    await u.save();
    return res.status(200).json({ message: "Joined successfully", data: match });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
router.post('/next', requireLogin,async (req, res) => {
  try {
    const {shortName } = req.body;

    if (!shortName) {
      return res.status(422).json({ error: "please add all fields" });
    }

    const match = await Session.findOne({shortName:shortName});

    if (!match) {
      return res.status(404).json({ error: "Session not found" });
    }
    match.users.shift();
    await match.save();
    const io = req.app.get("io");
    const url = process.env.FRONTEND_PORT+'/joinsession?shortName='+shortName;
    const qrCode = await QRCode.toDataURL(url);
    io.to(shortName).emit("data",match.users);
    return res.status(200).json({ message: "user deleted", data: match,qrcode:qrCode});

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
router.post('/myposition',requireLogin,async (req,res)=>{
  try {
    const { id_user, shortName } = req.body;

    if (!id_user || !shortName) {
      return res.status(422).json({ error: "please add all fields" });
    }

    const match = await Session.findOne({shortName:shortName});

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
router.post('/profile', requireLogin,async (req, res) => {
  try {
    const { id_user } = req.body;

    const match = await User.findById(id_user);

    if (!match) {
      return res.status(404).json({ message: "no user found" });
    }

    const data = {
      name: match.name,
      created: match.created,
      joined: match.joined
    };

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "something went wrong" });
  }
});
module.exports=router;
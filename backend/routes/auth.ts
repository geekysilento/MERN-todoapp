import express from "express";
import { User } from "../db";
const router = express.Router();
import { SECRET, authenticateJwt } from "../middleware";
import jwt from "jsonwebtoken";
import { object, string } from "zod";

const authSchema = object({
  username: string(),
  password: string(),
});

router.post("/signup", async (req, res) => {
  const { username, password } = authSchema.parse(req.body);
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "user already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token, });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = authSchema.parse(req.body);
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get('/me', authenticateJwt,  async (req, res) => {
    const user = await User.findOne({_id: req.headers['userId']})
    if(user){
        res.json({username: user.username});
    }else{
        res.status(403).json({message: "User Not Logged In"});
    }
})

export default router;

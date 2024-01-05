import express from 'express';
import { User } from '../db';
const router = express.Router();

    router.post('/signup',async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if (user){
            res.status(403).json({message: "user already exists"})
        }
        else {
            const newUser = new User({username, password});
            await newUser.save();
            res.json({ message: 'User created successfully' });
        }
    })

    




export default router


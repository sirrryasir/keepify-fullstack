import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from "../lib/env.js";

const generateToken = (id) => {
    return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: '30d' });
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ message: "Please provide name, email and password" });
        }

        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password
        })


        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
        
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export { registerUser, loginUser };
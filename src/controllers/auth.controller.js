import User from "../models/user.model.js";
import {hashPassword} from "../utils/hash.js";

export const registerUser = async (req,res) => {
    try{
        const body = req.body || {};
        const {email,password} = body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }

        const normalizedEmail = email.toLowerCase().trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(normalizedEmail)){
            return res.status(400).json({
                message:"Invalid email format"
            });
        }

        const existingUser = await User.findOne({email: normalizedEmail});
        if(existingUser){
            return res.status(409).json({message:"User already exists"});
        }
        
        const passwordHash = await hashPassword(password);

        const user = await User.create({
            email: normalizedEmail,
            passwordHash,
        });

        res.status(201).json({
            message:"User registered successfully",
            userId: user._id,

        });
    } catch(error){
        console.error("Error in registerUser:",error);
        if(error.code === 11000){
            return res.status(409).json({message:"User already exists"});
        }
        res.status(500).json({message:"Internal Server Error"});
    }
};
import User from "../models/user.model.js";
import {hashPassword,comparePassword} from "../utils/hash.js";
import {generateAccessToken} from "../services/token.service.js";

export const registerUser = async (req,res) => {
    try{
        const {email,password} = req.body;
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

export const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({email: normalizedEmail});
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }

        const isPasswordValid = await comparePassword(password,user.passwordHash);
        if(!isPasswordValid){
            return res.status(401).json({message:"invalid credentials"});
        }

        const accessToken = generateAccessToken(user._id);

        res.status(200).json({message:"Login Successful",
            accessToken,
        });
    } catch(error){
        console.error("Error in loginUser: ",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};
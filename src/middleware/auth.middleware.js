import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async(req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message:"Authorization token missing"
        });
    }

    const token = authHeader.split(" ")[1];

    if(!process.env.JWT_SECRET){
        return res.status(500).json({message:"Server configuration error"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-passwordHash -refreshToken");
        
        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        req.user=user;
        next();
    } catch(error){
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message:"Token has expired"});
        }
        if(error.name === "JsonWebTokenError"){
            return res.status(401).json({message:"Invalid token"});
        }
        return res.status(401).json({message:"Invalid or expired token"});
    }
};
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return jwt.sign(
        {userId: userId.toString()},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    );
};

export const generateRefreshToken = (userId) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
    }
    return jwt.sign(
        {userId: userId.toString()},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"7d"}
    );
};
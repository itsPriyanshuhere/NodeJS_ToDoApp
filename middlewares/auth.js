import  jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async (req,res,next) =>{

    const { token } = req.cookies;

    if(!token)
    return res.status(404).json({
        success: false,
        message: "Login First",
    });

    const decodedData = jwt.verify(token, "mySuperSecretKey123!$%#@");

    req.user = await User.findById(decodedData._id);
    next();
};
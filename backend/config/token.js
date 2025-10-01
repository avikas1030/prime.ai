import jwt from "jsonwebtoken";
import {use} from "react";

const generateToken = async (userId)=>{
    try{
        const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
        return token;
    }
    catch(error){
        console.log("Token generation error: ", error); 
        return res.status(500).json({message: "Internal server error"});
    }
}


export default generateToken;
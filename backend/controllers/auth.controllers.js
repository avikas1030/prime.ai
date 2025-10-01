import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../config/token.js"
export const signUp = async (req, res)=>{
    try{
        const {userName, email, password} = req.body
        if(!userName || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        const existUserName = await User.findOne({userName})
        if(existUserName){
            res.status(400).json({message:"User already exist"})
        }
        const existEmail = await User.findOne({email})
        if(existEmail){
            res.status(400).json({message:"Email already exist"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({userName, email, password: hashedPassword});

        const token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  secure: process.env.NODE_ENV === "production",
        })

        return res.status(201).json(user);
        
    }
    catch(error){
        return res.status(500).json({message: `Sign up error : ${error}`})
    }
}

export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }
        const token = await generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  secure: process.env.NODE_ENV === "production",
        })

        return res.status(200).json(user);
    }
    catch(error){
        console.log(`Login error : ${error}`);
        return res.status(500).json({message: `Login error : ${error}`})
    }
}

export const logOut = async (req, res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message: "Logout successful"})
    }
    catch(error){
        console.log(`Logout error : ${error}`);
        return res.status(500).json({message: `Logout error : ${error}`})
    }
}
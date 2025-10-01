import express from 'express';
import { signUp, login, logOut } from '../controllers/auth.controllers.js';
const authRouter = express.Router();
authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/logout", logOut)
export default authRouter;
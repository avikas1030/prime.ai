import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"
import taskRouter from "./routes/task.routes.js"
const port = process.env.PORT || 8000
let app = express()
app.use(cors({
    origin: "https://prime-ai-frontend.onrender.com",
    credentials: true
}))
app.use(express.json()) // to accept json data, if you are getting data from body
app.use(cookieParser()) // to accept cookie, to store token in cookie
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/tasks", taskRouter) 

app.listen(port, ()=>{
    connectDB()
    console.log(`serveer started at ${port}`)
})

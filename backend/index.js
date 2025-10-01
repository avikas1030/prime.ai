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
// CORS configuration for both development and production
const corsOptions = {
    origin: function (origin, callback) {
        console.log("CORS request from origin:", origin);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            "https://prime-ai-frontend.onrender.com",
            "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:4173", // Vite preview
            "http://127.0.0.1:5173" // Alternative localhost
        ];
        
        if (allowedOrigins.includes(origin)) {
            console.log("✅ CORS allowed for:", origin);
            callback(null, true);
        } else {
            console.log("❌ CORS blocked for:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions))
app.use(express.json()) // to accept json data, if you are getting data from body
app.use(cookieParser()) // to accept cookie, to store token in cookie
// Health check endpoint
app.get("/", (req, res) => {
    res.json({ 
        message: "Prime AI Backend is running!", 
        timestamp: new Date().toISOString(),
        cors: "enabled"
    });
});

app.get("/health", (req, res) => {
    res.json({ 
        status: "healthy", 
        timestamp: new Date().toISOString() 
    });
});

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/tasks", taskRouter) 

app.listen(port, ()=>{
    connectDB()
    console.log(`serveer started at ${port}`)
})

import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import messageRouter from "./routes/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./routes/userRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";

const app = express();

// Load environment variables
config({ path: "./config/config.env" });

// Database connection should be established first
dbConnection();

// Set up CORS
app.use(
  cors({
    origin: [
      'https://fullstack-j53ankrzp-hirumis-projects.vercel.app',  // Frontend URL
      'https://fullstackadmin-psi.vercel.app/login',  // Dashboard URL
    ], 
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Added 'X-Requested-With' for preflight
    credentials: true, // Allow credentials (cookies)
    preflightContinue: true, // Handle preflight requests properly
    optionsSuccessStatus: 200, // For legacy browsers that may not handle 204 response
  })
);


console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);


// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// A simple root route for testing the backend
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

// Error handling middleware should be at the end
app.use(errorMiddleware);

export default app;
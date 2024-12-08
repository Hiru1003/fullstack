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
    origin: ["https://fullstack-d7jxox7t9-hirumis-projects.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
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

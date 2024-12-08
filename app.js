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
      'https://fullstack-7eqclt5f1-hirumis-projects.vercel.app', // Frontend URL 1
      'https://fullstackadmin-psi.vercel.app', // Frontend URL 2
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies)
  })
);

// Handle OPTIONS requests for CORS preflight checks
app.options('*', cors());

// Log environment variables for debugging (be cautious with sensitive data in production)
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

// Middleware setup
app.use(cookieParser()); // Parse cookies attached to requests
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Directory for temporary file storage
  })
);

// Routes
app.use("/api/v1/message", messageRouter); // Message routes
app.use("/api/v1/user", userRouter); // User routes
app.use("/api/v1/appointment", appointmentRouter); // Appointment routes

// A simple root route for testing the backend
app.get("/", (req, res) => {
  res.send("Welcome to the backend API!");
});

// Error handling middleware should be at the end of the middleware stack
app.use(errorMiddleware);

export default app;

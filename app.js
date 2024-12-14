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
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://fullstack-puirrnj5p-hirumis-projects.vercel.app',
        'https://fullstackadmin-pli1md0rp-hirumis-projects.vercel.app',
        'https://fullstackadmin-psi.vercel.app',
        'https://fullstackadmin-2lp0u0w2f-hirumis-projects.vercel.app/'
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);


// Explicitly handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

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

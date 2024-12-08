import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate users based on role (admin or patient)
export const authenticateUser = catchAsyncErrors(
  async (req, res, next) => {
    // Extract token from cookies (either adminToken or patientToken)
    const token = req.cookies.token;
    if (!token) {
      return next(new ErrorHandler("User is not authenticated!", 400));
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found!", 404));
    }

    next(); // Proceed to the next middleware/route
  }
);

// Middleware to authenticate dashboard users (Admin)
export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    // Verify that the user is an Admin
    if (req.user.role !== "Admin") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next(); // Admin authenticated, proceed to the next middleware/route
  }
);

// Middleware to authenticate frontend users (Patient)
export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    // Verify that the user is a Patient
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next(); // Patient authenticated, proceed to the next middleware/route
  }
);

// Middleware to authorize based on multiple roles
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    // Check if user's role matches any of the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`${req.user.role} not allowed to access this resource!`, 403)
      );
    }
    next(); // User is authorized, proceed to the next middleware/route
  };
};


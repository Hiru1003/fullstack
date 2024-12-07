import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { generateToken } from "../utils/jwtToken.js";
// import cloudinary from "cloudinary";


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
  });
  generateToken(user, "User Registered!", 200, res);
});



export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    if (password !== confirmPassword) {
      return next(
        new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email Or Password!", 400));
    }
    if (role !== user.role) {
      return next(new ErrorHandler(`User Not Found With This Role!`, 400));
    }
    generateToken(user, "Login Successfully!", 201, res);
  });


  export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, nic, dob, gender, password } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Admin With This Email Already Exists!", 400));
    }
  
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Admin",
    });
    res.status(200).json({
      success: true,
      message: "New Admin Registered",
      admin,
    });
  });
  

  export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      doctorDepartment,
      docAvatar,  // Add this to capture image URL if provided
    } = req.body;
  
    // Check for required fields except for docAvatar
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !nic ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
  
    // Check if the doctor is already registered
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next(new ErrorHandler("Doctor With This Email Already Exists!", 400));
    }
  
    // Initialize docAvatarData to null
    let docAvatarData = null;
  
    // Check if docAvatar is an image URL or file
    if (docAvatar) {
      // If docAvatar is a URL, store the URL string directly
      if (docAvatar.startsWith('http') || docAvatar.startsWith('https')) {
        docAvatarData = docAvatar;
      }
      // If docAvatar is a file, handle it as an image file
      else if (req.files && req.files.docAvatar) {
        const { docAvatar: uploadedFile } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(uploadedFile.mimetype)) {
          return next(new ErrorHandler("File Format Not Supported!", 400));
        }
  
        // Upload to Cloudinary if docAvatar exists
        const cloudinaryResponse = await cloudinary.uploader.upload(
          uploadedFile.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary error");
          return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
        }
  
        // Set docAvatarData to Cloudinary URL if uploaded via Cloudinary
        docAvatarData = cloudinaryResponse.secure_url;
      }
    }
  
    // Create doctor with optional avatar data
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password,
      role: "Doctor",
      doctorDepartment,
      docAvatar: docAvatarData, // Store the image URL or Cloudinary URL
    });
  
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  });
  
  
  
  

  
  export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
      success: true,
      doctors,
    });
  });

  export const getAllStaff = catchAsyncErrors(async (req, res, next) => {
    const staff = await User.find({ role: "Staff" });
    res.status(200).json({
      success: true,
      staff,
    });
  });


  export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });


  // Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

// Logout function for frontend patient
export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
});



export const deleteDoctor = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  console.log(`Received DELETE request for doctor ID: ${id}`); 
  try {
    const doctor = await User.findById(id);
    if (!doctor) {
      console.log(`Doctor with ID ${id} not found!`);  
      return next(new ErrorHandler("Doctor Not Found!", 404));
    }

    console.log("Doctor to be deleted:", doctor);
    const deletedDoctor = await User.findByIdAndDelete(id);
    
    console.log(`Deleted doctor:`, deletedDoctor);
    res.status(200).json({
      success: true,
      message: "Doctor Deleted Successfully",
      data: deletedDoctor,  // Return the deleted doctor data
    });
  } catch (error) {
    console.error("Error in deleteDoctor controller:", error);
    next(new ErrorHandler("Internal Server Error", 500)); 
  }
});


export const editDoctor = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, dob, doctorDepartment, nic, gender } = req.body;

  console.log(`Received PUT request for doctor ID: ${id}`);

  try {
    const doctor = await User.findById(id);
    if (!doctor) {
      console.log(`Doctor with ID ${id} not found!`);
      return next(new ErrorHandler("Doctor Not Found!", 404));
    }

    // Update doctor details, excluding docAvatar
    doctor.firstName = firstName || doctor.firstName;
    doctor.lastName = lastName || doctor.lastName;
    doctor.email = email || doctor.email;
    doctor.phone = phone || doctor.phone;
    doctor.dob = dob || doctor.dob;
    doctor.doctorDepartment = doctorDepartment || doctor.doctorDepartment;
    doctor.nic = nic || doctor.nic;
    doctor.gender = gender || doctor.gender;

    const updatedDoctor = await doctor.save();

    console.log("Updated doctor:", updatedDoctor);
    res.status(200).json({
      success: true,
      message: "Doctor Updated Successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error("Error in editDoctor controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
});



export const addNewStaffMember = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    department,
    staffAvatar, // Ensure you're receiving this from the frontend
  } = req.body;

  console.log("Received staffAvatar:", staffAvatar); // Log to confirm data

  // Check for required fields except for staffAvatar
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !department
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // Check if the staff member is already registered
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Staff Member With This Email Already Exists!", 400));
  }

  // Initialize staffAvatarData to null
  let staffAvatarData = null;

  // Check if staffAvatar is an image URL or file
  if (staffAvatar) {
    // If staffAvatar is a URL, store the URL string directly
    if (staffAvatar.startsWith('http') || staffAvatar.startsWith('https')) {
      staffAvatarData = staffAvatar;
    }
    // If staffAvatar is a file, handle it as an image file
    else if (req.files && req.files.staffAvatar) {
      const { staffAvatar: uploadedFile } = req.files;
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(uploadedFile.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
      }

      // Upload to Cloudinary if staffAvatar exists
      const cloudinaryResponse = await cloudinary.uploader.upload(
        uploadedFile.tempFilePath
      );
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
          "Cloudinary Error:",
          cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(
          new ErrorHandler("Failed To Upload Staff Avatar To Cloudinary", 500)
        );
      }

      // Set staffAvatarData to Cloudinary URL and public_id if uploaded via Cloudinary
      staffAvatarData = cloudinaryResponse.secure_url;
    }
  }

  // Create staff member with optional avatar data
  const staffMember = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Staff",  // Define the role as Staff
    department,
    staffAvatar: staffAvatarData,  // Store the image URL or Cloudinary URL
  });

  res.status(200).json({
    success: true,
    message: "New Staff Member Registered",
    staffMember,
  });
});



export const deleteStaffMember = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  console.log(`Received DELETE request for staff ID: ${id}`);
  try {
    const staff = await User.findById(id);
    if (!staff) {
      console.log(`Staff with ID ${id} not found!`);
      return next(new ErrorHandler("Staff Not Found!", 404));
    }

    console.log("Staff to be deleted:", staff);
    const deletedStaff = await User.findByIdAndDelete(id);

    console.log(`Deleted staff:`, deletedStaff);
    res.status(200).json({
      success: true,
      message: "Staff Deleted Successfully",
      data: deletedStaff,
    });
  } catch (error) {
    console.error("Error in deleteStaffMember controller:", error);
    next(new ErrorHandler("Internal Server Error", 500));
  }
});

// Edit a staff member
export const editStaffMember = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, dob, staffDepartment, nic, gender } =
    req.body;

  console.log(`Received PUT request for staff ID: ${id}`);

  try {
    const staff = await User.findById(id);
    if (!staff) {
      console.log(`Staff with ID ${id} not found!`);
      return next(new ErrorHandler("Staff Not Found!", 404));
    }

    staff.firstName = firstName || staff.firstName;
    staff.lastName = lastName || staff.lastName;
    staff.email = email || staff.email;
    staff.phone = phone || staff.phone;
    staff.dob = dob || staff.dob;
    staff.staffDepartment = staffDepartment || staff.staffDepartment;
    staff.nic = nic || staff.nic;
    staff.gender = gender || staff.gender;

    const updatedStaff = await staff.save();

    console.log("Updated staff:", updatedStaff);
    res.status(200).json({
      success: true,
      message: "Staff Updated Successfully",
      data: updatedStaff,
    });
  } catch (error) {
    console.error("Error in editStaffMember controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
});
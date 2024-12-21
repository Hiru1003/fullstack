import express from "express";
import {
  patientRegister,
  addNewDoctor,
  addNewAdmin,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  deleteDoctor,
  login,
  editDoctor,
  addNewStaffMember,
  deleteStaffMember,
  editStaffMember,
  getAllStaff,
} from "../controller/userController.js";

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";


const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", addNewAdmin);
router.post("/doctor/addnew",  addNewDoctor);
router.post("/staff/addnew", addNewStaffMember);
router.put("/staff/:id",  editStaffMember);
router.delete("/staff/:id",  deleteStaffMember);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/doctors", getAllDoctors);
router.get("/staff", getAllStaff);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout",  logoutAdmin);
router.delete("/doctors/:id", deleteDoctor);
router.put("/doctors/:id", editDoctor);
// router.delete("/staff/:id",isAdminAuthenticated, deleteStaffMember);
// router.put("/staff/:id",isAdminAuthenticated, editStaffMember);


export default router;
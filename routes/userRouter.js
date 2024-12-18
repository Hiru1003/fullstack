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
router.post("/admin/addnew",isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.post("/staff/addnew", isAdminAuthenticated, addNewStaffMember);
router.put("/staff/:id", isAdminAuthenticated, editStaffMember);
router.delete("/staff/:id", isAdminAuthenticated, deleteStaffMember);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/doctors", getAllDoctors);
router.get("/staff", getAllStaff);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.delete("/doctors/:id",isAdminAuthenticated, deleteDoctor);
router.put("/doctors/:id",isAdminAuthenticated, editDoctor);
// router.delete("/staff/:id",isAdminAuthenticated, deleteStaffMember);
// router.put("/staff/:id",isAdminAuthenticated, editStaffMember);


export default router;
import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";
import AddNewStaffMember from "./components/AddStaff";
import Staff from "./components/Staff";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setAdmin } = useContext(Context);

  // Fetch the authenticated user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/admin/me",
          {
            withCredentials: true,  // Send cookies with the request
          }
        );
        setIsAuthenticated(true);  // User is authenticated
        setAdmin(response.data.user);  // Set admin data
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
        // Set error message if the authentication fails
        setError("Failed to fetch user data. Please login again.");
        toast.error("Authentication error. Please login again.");
      }
    };

    if (isAuthenticated) {
      fetchUser();  // Fetch user data only if authenticated
    }
  }, [isAuthenticated, setAdmin, setIsAuthenticated]);
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/staff/addnew" element={<AddNewStaffMember/>} />
        <Route path="/admin/addnew" element={<AddNewAdmin />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
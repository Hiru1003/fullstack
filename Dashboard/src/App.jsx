import React, { useContext, useEffect, useState } from "react";
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
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  // State for error handling
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        // API call to fetch admin details
        const response = await axios.get(
          "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/admin/me",
          {
            withCredentials: true, // Include cookies for authentication
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user); // Store the admin user data
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
        setError("Failed to fetch admin data. Please login again.");
      }
    };
  
    // Fetch admin data if authenticated
    if (isAuthenticated) {
      fetchAdmin();
    }
  }, [isAuthenticated, setIsAuthenticated, setUser]);
  


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
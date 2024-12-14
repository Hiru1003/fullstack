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
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          // Get the token from localStorage
          const authToken = localStorage.getItem("authToken");
          if (!authToken) {
            throw new Error("No authentication token found.");
          }

          const response = await axios.get(
            "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/admin/me",
            {
              headers: {
                Authorization: `Bearer ${authToken}`, // Send token in Authorization header
              },
              withCredentials: true, // Include credentials if necessary
            }
          );
          setIsAuthenticated(true);
          setAdmin(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setAdmin({});
        }
      };
      fetchUser();
    }, [isAuthenticated]);
    
    

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
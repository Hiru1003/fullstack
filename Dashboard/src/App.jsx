import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewStaffMember from "./components/AddStaff";
import Staff from "./components/Staff";
import "./App.css";

// Custom navigation wrapper
const NavigateWrapper = ({ to }) => {
  const navigateTo = () => {
    window.location.href = to; // Use window.location for navigation fallback
  };

  useEffect(() => {
    navigateTo();
  }, [to]);

  return null;
};

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/admin/me",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            withCredentials: true,
          }
        );

        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
            toast.error("Login Required");
          } else if (status === 401) {
            toast.error("Unauthorized: Your session has expired or the token is invalid.");
            localStorage.removeItem("authToken");
            setIsAuthenticated(false);
            setAdmin({});
            <NavigateWrapper to="/login" />;
          } else {
            toast.error(`Error: ${data.message || error.message}`);
          }
        } else if (error.request) {
          toast.error("No response from the server. Please try again later.");
        } else {
          toast.error(`Error: ${error.message}`);
        }

        setIsAuthenticated(false);
        setAdmin({});
      }
    };

    fetchUser();
  }, [setAdmin, setIsAuthenticated]);

  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/addnew" element={<AddNewDoctor />} />
        <Route path="/staff/addnew" element={<AddNewStaffMember />} />
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

import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";


const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  // State for error handling
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchUser = async () => {
        try {
          // Get the token from localStorage
          const authToken = localStorage.getItem("authToken");
          if (!authToken) {
            throw new Error("No authentication token found.");
          }
      
          const response = await axios.get(
            "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/patient/me",
            {
              headers: {
                Authorization: `Bearer ${authToken}`, // Send token in Authorization header
              },
              withCredentials: true, // Include credentials if necessary
            }
          );
          setIsAuthenticated(true);
          setUser(response.data.user);
        } catch (error) {
          setIsAuthenticated(false);
          setUser({});
          setError("Failed to fetch user data. Please login again.");
          console.error("Error fetching user:", error);
        }
      };
      
    };

    // Fetch user data if authenticated
    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, setIsAuthenticated, setUser]);
  

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
import React, { useContext, useEffect } from "react";
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

  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(Context);

// Retrieve token from localStorage
const token = localStorage.getItem("token");

if (token) {
  // If token exists, make the API request with the Authorization header
  axios.get("https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/patient/me", {
    headers: {
      Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
    },
  })
  .then(response => {
    // Handle successful response
    console.log("User info:", response.data);
  })
  .catch(error => {
    // Check if error response is available
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error fetching user info: ", error.response.data);
      console.error("Status Code: ", error.response.status);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received from server.");
    } else {
      // Something went wrong in setting up the request
      console.error("Error in setting up request:", error.message);
    }
  });
} else {
  // Token not found in localStorage
  console.error("No token found. User is not authenticated.");
}


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
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

  const token = localStorage.getItem("token");  // Retrieve token from storage

  if (token) {
    console.log("Token:", token); // Check token before sending request
  
    axios.get("https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/patient/me", {
      headers: {
        Authorization: `Bearer ${token}`,  // Ensure correct Authorization header format
      },
    })
    .then(response => {
      console.log("User info:", response.data);
    })
    .catch(error => {
      console.error("Error fetching user info:", error);
    });
  } else {
    console.error("No token found. Please log in.");
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
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Debugging: Log inputs
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  
    // Validate inputs
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      // Payload with confirmPassword and role
      const payload = {
        email,
        password,
        confirmPassword,
        role: "Admin", // Adjust role as needed, e.g., "Admin", "Doctor", etc.
      };
  
      console.log("Sending Payload:", payload); // Debugging: Log payload before sending
  
      // API call
      const response = await axios.post(
        "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/login",
        payload,
        {
          withCredentials: true, // Ensures cookies are sent
          headers: { "Content-Type": "application/json" },
        }
      );
  
      // Handle successful login
      toast.success(response.data.message);
      localStorage.setItem("authToken", response.data.token);
      setIsAuthenticated(true);
      navigateTo("/"); // Redirect to the dashboard or appropriate page
    } catch (error) {
      // Handle errors
      console.error("Error Response:", error.response);
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  };
  
  

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="page container form-component login-form" style={{
        backgroundColor: "white" }}>
        <br />
        <br />
        <br />
        <h2>Admin Sign In</h2>
        <p>Please Login To Access Admin Resources</p>
        <p>
          Welcome back! Log in to your admin account to manage the platform
          effectively.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
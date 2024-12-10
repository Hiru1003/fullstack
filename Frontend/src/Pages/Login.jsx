import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
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
        role: "Patient", // Adjust role as needed, e.g., "Admin", "Doctor", etc.
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
      <div className="container form-component login-form">
        <br/><br/><br/>
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
        Welcome back! Log in to your account and take control of your health journey, from appointments to personalized care.
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
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
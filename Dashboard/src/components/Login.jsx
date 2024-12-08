import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Sending login request to backend with CORS configuration
      const response = await axios.post(
        "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/login",
        { email, password, role: "Admin" },
        {
          withCredentials: true,  // This ensures cookies are sent with the request
          headers: {
            "Content-Type": "application/json",  // Ensuring the right content type
          },
        }
      );
      
      // On successful login, show a success message
      toast.success(response.data.message);
  
      // Update the authentication state
      setIsAuthenticated(true);  // Set the user as authenticated
  
      // Redirect to the home page after login
      navigateTo("/");
  
      // Clear form fields after successful login
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      // Handle login failure or CORS issues
      const errorMessage = error.response?.data?.message || "Login failed due to server error";
      toast.error(errorMessage);
    }
  };
  
  

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">WELCOME TO MEDICARE</h1>
        <p>Only Admins Are Allowed To Access These Resources!</p>
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
      </section>
    </>
  );
};

export default Login;
import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("Admin"); 

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    const role = "Admin"; // Hardcoded role for admin login
  
    try {
      console.log("Request Payload:", { email, password, confirmPassword, role }); // Debugging
      const response = await axios.post(
        "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/login",
        { email, password, confirmPassword, role }, // Ensure confirmPassword is included here
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
  
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
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
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
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

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Payload with all fields and role set to "Admin"
      const payload = {
        email,
        password,
        confirmPassword,
        role: "Admin",
      };

      console.log("Sending Admin Payload:", payload);

      const response = await axios.post(
        "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/login",
        payload,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Success feedback
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/admin-dashboard");
    } catch (error) {
      // Log error and show feedback
      console.error("Error Response:", error.response);
      const errorMessage = error.response?.data?.message || "Admin login failed";
      toast.error(errorMessage);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
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

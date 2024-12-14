import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { isAuthenticated, admin } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Get the token from localStorage
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("No authentication token found. Please log in.");
        }
  
        const response = await axios.get(
          "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/appointment/getall",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${authToken}`, // Include token in Authorization header
            },
          }
        );
  
        // Set appointments data on successful fetch
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error.response || error);
  
        // Clear appointments if fetching fails
        setAppointments([]);
        setError(error.response?.data?.message || "Failed to fetch appointments");
  
        // Show an appropriate error message using toast
        const errorMessage =
          error.response?.data?.message ||
          (error.response?.status === 400
            ? "Bad Request: Invalid request data or authentication issue."
            : "An error occurred while fetching appointments.");
        toast.error(errorMessage);
  
        // Handle token-related issues: Redirect to login
        if (
          error.message.includes("authentication token") || // Local error
          error.response?.status === 401 || // Unauthorized
          error.response?.data?.message === "Token has expired" // Expired token
        ) {
          localStorage.removeItem("authToken"); // Clear invalid token
          navigate("/login"); // Redirect to login
        }
      }
    };
  
    fetchAppointments();
  }, [navigate]);
  
  

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        toast.error("Authentication token missing.");
        navigate("/login");
        return;
      }

      const { data } = await axios.put(
        `https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update appointment status."
      );
    }
  };

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doctors.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>
              Hello, Admin! We're glad to have you back. Here, you can manage
              appointments, patient records, and streamline clinic operations
              seamlessly. Let's make healthcare more efficient and accessible
              together!
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>1500</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>10</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0
              ? appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>
                      {appointment.appointment_date.substring(0, 16)}
                    </td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                  </tr>
                ))
              : "No Appointments Found!"}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;

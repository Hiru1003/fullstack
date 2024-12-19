import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../main";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, admin } = useContext(Context);
  const navigate = useNavigate();
  const isInitialFetch = useRef(true); // To prevent repeated toasts

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/appointment/getall",
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );

        setAppointments(response.data.appointments || []);
      } catch (error) {
        if (isInitialFetch.current) {
          if (error.response) {
            const { status, data } = error.response;

            if (
              status === 401 ||
              data.message === "Dashboard User is not authenticated!"
            ) {
              toast.error(
                "Unauthorized: Your session has expired or the token is invalid."
              );
              localStorage.removeItem("authToken");
              navigate("/login");
            } else {
              toast.error(data.message || "An unexpected error occurred.");
            }
          } else if (error.request) {
            toast.error("No response from the server. Please try again later.");
          } else {
            toast.error(`Error: ${error.message}`);
          }
          isInitialFetch.current = false; // Prevent further toasts
        }
      }
    };

    if (isInitialFetch.current) {
      fetchAppointments();
    }
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

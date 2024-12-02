import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState({});
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/v1/user/doctors/${doctorId}`,
          { withCredentials: true }
        );
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== doctorId)
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete doctor");
      }
    }
  };

  const handleEdit = (doctor) => {
    setEditMode(true);
    setEditedDoctor(doctor);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/user/doctors/${editedDoctor._id}`,
        editedDoctor,
        { withCredentials: true }
      );
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === editedDoctor._id ? response.data.data : doctor
        )
      );
      setEditMode(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update doctor");
    }
  };

  const handleChange = (e) => {
    setEditedDoctor({ ...editedDoctor, [e.target.name]: e.target.value });
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div className="card" key={doctor._id}>
              <button
                className="delete-button"
                onClick={() => handleDelete(doctor._id)}
                title="Delete Doctor"
              >
                <FaTrash />
              </button>
              <button
                className="edit-button"
                onClick={() => handleEdit(doctor)}
                title="Edit Doctor"
              >
                <FaEdit />
              </button>

              <img
                src={
                  doctor.docAvatar &&
                  (doctor.docAvatar.startsWith("http")
                    ? doctor.docAvatar
                    : doctor.docAvatar.url)
                }
                alt="doctor avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <h4>{`${doctor.firstName} ${doctor.lastName}`}</h4>
              <div className="details">
                <p>
                  Email:{" "}
                  <span>{editMode && editedDoctor._id === doctor._id ? (
                    <input
                      type="email"
                      name="email"
                      value={editedDoctor.email}
                      onChange={handleChange}
                    />
                  ) : (
                    doctor.email
                  )}</span>
                </p>
                <p>
                  Phone:{" "}
                  <span>{editMode && editedDoctor._id === doctor._id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editedDoctor.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    doctor.phone
                  )}</span>
                </p>
                <p>
                  DOB:{" "}
                  <span>{editMode && editedDoctor._id === doctor._id ? (
                    <input
                      type="date"
                      name="dob"
                      value={editedDoctor.dob}
                      onChange={handleChange}
                    />
                  ) : (
                    doctor.dob.substring(0, 10)
                  )}</span>
                </p>
                <p>
                  Department:{" "}
                  <span>{editMode && editedDoctor._id === doctor._id ? (
                    <input
                      type="text"
                      name="doctorDepartment"
                      value={editedDoctor.doctorDepartment}
                      onChange={handleChange}
                    />
                  ) : (
                    doctor.doctorDepartment
                  )}</span>
                </p>
                <p>
                  NIC:{" "}
                  <span>{editMode && editedDoctor._id === doctor._id ? (
                    <input
                      type="text"
                      name="nic"
                      value={editedDoctor.nic}
                      onChange={handleChange}
                    />
                  ) : (
                    doctor.nic
                  )}</span>
                </p>
                <p>
                  Gender:{" "}
                  <span>{editMode && editedDoctor._id === doctor._id ? (
                    <input
                      type="text"
                      name="gender"
                      value={editedDoctor.gender}
                      onChange={handleChange}
                    />
                  ) : (
                    doctor.gender
                  )}</span>
                </p>
              </div>
              {editMode && editedDoctor._id === doctor._id && (
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          ))
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>

      <style jsx>{`
        .delete-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          color: black;
          font-size: 20px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .edit-button {
          position: absolute;
          top: 40px;
          right: 10px;
          background: none;
          border: none;
          color: black;
          font-size: 20px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .delete-button:hover, .edit-button:hover {
          transform: scale(1.2);
        }

        .card {
          position: relative;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .card img {
          border-radius: 50%;
        }

        .details p {
          margin: 5px 0;
        }

        .details input {
          margin-left: 10px;
        }

        .save-button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
          margin-top: 10px;
        }

        .save-button:hover {
          background-color: #45a049;
        }

        .save-button:active {
          background-color: #397539;
        }
      `}</style>
    </section>
  );
};

export default Doctors;

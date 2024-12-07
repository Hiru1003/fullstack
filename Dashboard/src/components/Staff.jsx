import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedStaff, setEditedStaff] = useState({});
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await axios.get(
          "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/staff",
          { withCredentials: true }
        );
        setStaff(data.staff);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchStaff();
  }, []);

  const handleDelete = async (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        const response = await axios.delete(
          `https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/staff/${staffId}`,
          { withCredentials: true }
        );
        setStaff((prevStaff) =>
          prevStaff.filter((staff) => staff._id !== staffId)
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete staff");
      }
    }
  };

  const handleEdit = (staff) => {
    setEditMode(true);
    setEditedStaff(staff);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/staff/${editedStaff._id}`,
        editedStaff,
        { withCredentials: true }
      );
      setStaff((prevStaff) =>
        prevStaff.map((staff) =>
          staff._id === editedStaff._id ? response.data.data : staff
        )
      );
      setEditMode(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update staff");
    }
  };

  const handleChange = (e) => {
    setEditedStaff({ ...editedStaff, [e.target.name]: e.target.value });
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page doctors">
      <h1>Staff</h1>
      <div className="banner">
        {staff && staff.length > 0 ? (
          staff.map((staff) => (
            <div className="card" key={staff._id}>
              <button
                className="delete-button"
                onClick={() => handleDelete(staff._id)}
                title="Delete Staff Member"
              >
                <FaTrash />
              </button>
              <button
                className="edit-button"
                onClick={() => handleEdit(staff)}
                title="Edit staff"
              >
                <FaEdit />
              </button>
              <img
                src={
                  staff.staffAvatar &&
                  (staff.staffAvatar.startsWith("http")
                    ? staff.staffAvatar
                    : staff.staffAvatar.url)
                }
                alt="staff avatar"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              
              <h4>{`${staff.firstName} ${staff.lastName}`}</h4>
              <div className="details">
              <p>
            Email:{" "}
            <span>
              {editMode && editedStaff._id === staff._id ? (
                <input
                  type="email"
                  name="email"
                  value={editedStaff.email}
                  onChange={handleChange}
                />
              ) : (
                staff.email
              )}
            </span>
          </p>

          <p>
            Phone:{" "}
            <span>
              {editMode && editedStaff._id === staff._id ? (
                <input
                  type="text"
                  name="phone"
                  value={editedStaff.phone}
                  onChange={handleChange}
                />
              ) : (
                staff.phone
              )}
            </span>
          </p>

          <p>
            DOB:{" "}
            <span>
              {editMode && editedStaff._id === staff._id ? (
                <input
                  type="date"
                  name="dob"
                  value={editedStaff.dob}
                  onChange={handleChange}
                />
              ) : (
                staff.dob.substring(0, 10)
              )}
            </span>
          </p>



                <p>
                  Department:{" "}
                  <span>
                    {editMode && editedStaff._id === staff._id ? (
                      <select
                        name="department"
                        value={editedStaff.department}
                        onChange={handleChange}
                      >
                        <option value="">Select Department</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                      </select>
                    ) : (
                      staff.department
                    )}
                  </span>
                </p>

                
                <p>
            NIC:{" "}
            <span>
              {editMode && editedStaff._id === staff._id ? (
                <input
                  type="text"
                  name="nic"
                  value={editedStaff.nic}
                  onChange={handleChange}
                />
              ) : (
                staff.nic
              )}
            </span>
          </p>
          <p>
            Gender:{" "}
            <span>
              {editMode && editedStaff._id === staff._id ? (
                <input
                  type="text"
                  name="gender"
                  value={editedStaff.gender}
                  onChange={handleChange}
                />
              ) : (
                staff.gender
              )}
            </span>
          </p>
              </div>
              {editMode && editedStaff._id === staff._id && (
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          ))
        ) : (
          <h1>No Registered Staff Member Found!</h1>
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

export default Staff;

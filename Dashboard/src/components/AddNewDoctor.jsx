import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docavatarUrl, setAvatarUrl] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const doctorData = {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment,
        docAvatar: docavatarUrl, 
      };

      await axios
        .post("http://localhost:4000/api/v1/user/doctor/addnew", doctorData, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          // Reset form fields after successful submission
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
          setDoctorDepartment("");
          setAvatarUrl("");
        });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <section className="container doctor-form-component add-doctor-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">REGISTER A NEW DOCTOR</h1>
        <form onSubmit={handleAddNewDoctor}>
          <div className="first-wrapper">
            <div className="form-grid">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="number"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="number"
                  placeholder="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                />
                <select
                  value={doctorDepartment}
                  onChange={(e) => setDoctorDepartment(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginBottom: "15px",
                    fontSize: "18px",
                  }}
                >
                  <option value="">Select Department</option>
                  {departmentsArray.map((depart, index) => (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  ))}
                </select>

                {/* Image URL input */}
                <input
                  type="text"
                  placeholder="Doctor Image URL (optional)"
                  value={docavatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    fontSize: "18px",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  display: "block",
                  margin: "10px auto",
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
              >
                Register New Doctor
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewDoctor;

import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return; // If the user cancels, do nothing

    try {
      // Sending logout request to the backend
      const response = await axios.get(
        "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/user/admin/logout",
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      
      // Show success toast message
      toast.success(response.data.message);
  
      // Update authentication state to false
      setIsAuthenticated(false);
  
      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      // Handle error
      const errorMessage = error.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  };

  const gotoHomePage = () => {
    navigate("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigate("/doctors");
    setShow(!show);
  };
  const gotoStaffPage = () => {
    navigate("/staff");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigate("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigate("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewStaffMember = () => {
    navigate("/staff/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigate("/admin/addnew");
    setShow(!show);
  };

  return (
    <>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <FaPeopleGroup onClick={gotoStaffPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiOutlineUsergroupAdd onClick={gotoAddNewStaffMember} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div className="wrapper">
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;

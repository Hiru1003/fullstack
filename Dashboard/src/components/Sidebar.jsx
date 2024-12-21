import React, { useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    // Perform direct logout and redirect to login
    navigate("/login");
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

  // Check if the current path is the login page
  const isLoginPage = window.location.pathname === "/login";

  return (
    <>
      <nav>
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
      <div className="wrapper" style={isLoginPage ? { display: "none" } : { display: "flex" }}>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;

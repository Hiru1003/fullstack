import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current path is the login page
  const isLoginPage = location.pathname === "/login";

  // Simulate authentication check (replace with actual authentication check)
  const isAuthenticated = localStorage.getItem("authToken"); // Assuming token is stored in localStorage

  useEffect(() => {
    // Redirect to dashboard if user is already authenticated and tries to access the login page
    if (isAuthenticated && isLoginPage) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoginPage, navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear the authentication token or session (simulated here by clearing localStorage)
      localStorage.removeItem("authToken");
      navigate("/login"); // Redirect to login page after logout
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
      {/* Conditionally render the sidebar */}
      {!isLoginPage && (
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
            <GiHamburgerMenu
              className="hamburger"
              onClick={() => setShow(!show)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;

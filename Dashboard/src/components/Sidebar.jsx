import React, { useState } from "react";
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

  // Determine if the current route is login
  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/login"); // Redirect to login page
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

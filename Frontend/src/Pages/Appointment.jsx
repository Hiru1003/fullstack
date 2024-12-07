import React from "react";
import AppointmentForm from "../components/AppointmentForm";

const Appointment = () => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{"Schedule Your Appointment"}</h1>
          <p>
          Medicare Medical Institute is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            Medicare, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div className="banner">
          <img src={"/docillus5.webp"} alt="hero"  />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
      <AppointmentForm/>
    </>
  );
};

export default Appointment;
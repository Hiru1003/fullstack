import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{"Your Trusted Healthcare Provider"}</h1>
          <p>
            Medicare is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            Medicare, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div className="banner">
          <img src={"/docillus3.webp"} alt="hero" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
      <Biography imageUrl={"/docillus4.webp"} />
    </>
  );
};

export default AboutUs;
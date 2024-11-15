import React, { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";

const Home = () => {
  return (
    <>
   <Hero/>
   <Biography imageUrl={"/docillus2.png"} />
   <Departments/>
   <MessageForm/>

    </>
  );
};

export default Home;
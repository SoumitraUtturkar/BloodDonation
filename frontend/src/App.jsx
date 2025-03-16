import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Signup from "./Pages/Signup.jsx";
import RequestBlood from "./Pages/RequestBlood.jsx";
import DonateBlood from "./Pages/DonateBlood.jsx";
import Navbar from "./Components/Navbar.jsx";
import "./index.css";
import Login from "./Pages/Login.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/donate-blood" element={<DonateBlood />} />
      </Routes>
      <About/>
      <Contact/>
    </>
  );
}

export default App;


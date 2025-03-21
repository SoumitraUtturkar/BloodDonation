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
import BloodBankForm from "./Pages/BloodBankForm.jsx"
import LiveRequest from "./Pages/LiveRequest.jsx";
import PatientRequest from "./Pages/PatientRequest.jsx";  // ✅ Import PatientRequest Page
import TrackRequest from "./Pages/TrackRequest.jsx";
import BloodBankLanding from "./Pages/BloodBankLanding.jsx";
import TrackRequestDonor from "./Pages/TrackRequestDonor.jsx";
import UpdateBloodRequest from "./Pages/UpdateBlood.jsx";
import Profile from "./Pages/Profile.jsx";

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
        <Route path="/register" element={<BloodBankForm />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/donate-blood" element={<DonateBlood />} />
        <Route path="/live-requests" element={<LiveRequest />} />
        <Route path="/patient-request/:id" element={<PatientRequest />} />  {/* ✅ Route for Patient Request */}
        <Route path="/track-request" element={<TrackRequest />} />
        <Route path="/blood-bank" element={<BloodBankLanding />} />
        <Route path="/request-donor-track/:id" element={<TrackRequestDonor/>}/>
        <Route path="/update-blood-request/:id" element={<UpdateBloodRequest />} /> 
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
}

export default App;
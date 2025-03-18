

import React from "react";
import { useNavigate } from "react-router-dom";

const TrackRequestDonor = () => {
  const navigate = useNavigate();

  // Replace this with real patient data (Fetched from backend)
  const acceptedPatient = { 
    name: "Alice Smith", 
    bloodType: "O+", 
    contact: "9876543210", 
    location: "Pune", 
    hospital: "City Hospital",
    mapLink: "https://maps.google.com/?q=Pune" 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-red-200 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-xl border border-red-300">
        {/* Title */}
        <h2 className="text-4xl font-bold text-red-700 text-center mb-6">
          Track Your Accepted Patient
        </h2>

        {/* Patient Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row justify-between items-center">
          {/* Patient Info */}
          <div className="text-center md:text-left">
            <p className="text-2xl font-semibold text-gray-800">Patient: {acceptedPatient.name}</p>
            <p className="text-gray-600 mt-1"><strong>Blood Type:</strong> {acceptedPatient.bloodType}</p>
            <p className="text-gray-600"><strong>Hospital:</strong> {acceptedPatient.hospital}</p>
            <p className="text-gray-600"><strong>Location:</strong> {acceptedPatient.location}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {acceptedPatient.contact}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 md:mt-0 flex gap-4">
            {/* Map Tracking Button */}
            <a 
              href={acceptedPatient.mapLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Track on Map
            </a>

            {/* Call Patient Button */}
            <a 
              href={`tel:${acceptedPatient.contact}`} 
              className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Back Button */}
        <button
          className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition block mx-auto"
          onClick={() => navigate(-1)}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TrackRequestDonor;
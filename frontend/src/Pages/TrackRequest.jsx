import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrackRequestDonor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patientData = location.state;

  if (!patientData) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 font-semibold">Error: No patient data found. Please try again.</p>
        <button onClick={() => navigate("/donate")} className="text-blue-600 underline">
          Go Back
        </button>
      </div>
    );
  }

  const mapLink = `https://maps.google.com/?q=${encodeURIComponent(patientData.location)}`;

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-red-200 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-xl border border-red-300">
        <h2 className="text-4xl font-bold text-red-700 text-center mb-6">
          Track Patient Request
        </h2>

        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">{patientData.patient_name}</p>
          <p className="text-gray-600 mt-1"><strong>Guardian:</strong> {patientData.guardian_name}</p>
          <p className="text-gray-600"><strong>Blood Type:</strong> {patientData.bloodType}</p>
          <p className="text-gray-600"><strong>Location:</strong> {patientData.location}</p>
          <p className="text-gray-600"><strong>Contact:</strong> {patientData.phone}</p>
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          {/* Google Maps Tracking */}
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Track on Map
          </a>
          {/* Call Guardian */}
          <a
            href={`tel:${patientData.phone}`}
            className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
          >
            Call Guardian
          </a>
        </div>

        <button
          className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          onClick={() => navigate(-1)}
        >
          Back to Requests
        </button>
      </div>
    </div>
  );
};

export default TrackRequestDonor;

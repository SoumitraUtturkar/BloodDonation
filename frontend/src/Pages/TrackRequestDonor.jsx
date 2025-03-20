// import React from "react";
// import { useNavigate } from "react-router-dom";

// const TrackRequestDonor = () => {
//   const navigate = useNavigate();

//   // Replace this with real patient data (Fetched from backend)
//   const acceptedPatient = { 
//     name: "Alice Smith", 
//     bloodType: "O+", 
//     contact: "9876543210", 
//     location: "Katraj", 
//     hospital: "Bharti Hospital"
//   };

//   // Dynamically generate Google Maps search link
//   const mapSearchLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(acceptedPatient.hospital)}`;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-red-100 to-red-200 flex justify-center items-center p-6">
//       <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-xl border border-red-300">
//         {/* Title */}
//         <h2 className="text-4xl font-bold text-red-700 text-center mb-6">
//           Track Your Accepted Patient
//         </h2>

//         {/* Patient Details */}
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row justify-between items-center">
//           {/* Patient Info */}
//           <div className="text-center md:text-left">
//             <p className="text-2xl font-semibold text-gray-800">Patient: {acceptedPatient.name}</p>
//             <p className="text-gray-600 mt-1"><strong>Blood Type:</strong> {acceptedPatient.bloodType}</p>
//             <p className="text-gray-600"><strong>Hospital:</strong> {acceptedPatient.hospital}</p>
//             <p className="text-gray-600"><strong>Location:</strong> {acceptedPatient.location}</p>
//             <p className="text-gray-600"><strong>Contact:</strong> {acceptedPatient.contact}</p>
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-4 md:mt-0 flex gap-4">
//             {/* Map Tracking Button */}
//             <a 
//               href={mapSearchLink} 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
//             >
//               Track on Map
//             </a>

//             {/* Call Patient Button */}
//             <a 
//               href={`tel:${acceptedPatient.contact}`} 
//               className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
//             >
//               Call Now
//             </a>
//           </div>
//         </div>

//         {/* Back Button */}
//         <button
//           className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition block mx-auto"
//           onClick={() => navigate(-1)}
//         >
//           Back to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TrackRequestDonor;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "/api/v3"; // API base URL

const TrackRequestDonor = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: Please log in.");

        // Retrieve patientId from localStorage
        const patientId = localStorage.getItem("selectedPatientId");
        if (!patientId) throw new Error("No patient selected.");

        // Fetch patient details
        const { data } = await axios.get(`${API_BASE_URL}/details/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (data.success) {
          setPatient(data.patient);
        } else {
          throw new Error(data.message || "Failed to fetch patient details.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  if (loading) return <div className="text-center text-red-600 text-xl">Loading patient details...</div>;
  if (error) return <div className="text-center text-red-600 text-xl">{error}</div>;
  if (!patient) return <div className="text-center text-red-600 text-xl">No patient details available.</div>;

  const mapSearchLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(patient.hospital)}`;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-xl border border-red-300">
        <h2 className="text-4xl font-bold text-red-700 text-center mb-6">Track Your Accepted Patient</h2>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row items-center gap-6">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
            src={patient.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Patient"
            onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
          />

          <div className="text-center md:text-left">
            <p className="text-2xl font-semibold text-gray-800">Patient: {patient.name}</p>
            <p className="text-gray-600"><strong>Blood Type:</strong> {patient.bloodType}</p>
            <p className="text-gray-600"><strong>Hospital:</strong> {patient.hospital}</p>
            <p className="text-gray-600"><strong>Location:</strong> {patient.location}</p>
            <p className="text-gray-600"><strong>Guardian:</strong> {patient.guardian_name}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {patient.phone}</p>
            <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
            <p className={`text-gray-600 font-semibold ${patient.urgency === "High" ? "text-red-500" : ""}`}>
              <strong>Urgency:</strong> {patient.urgency}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <a href={mapSearchLink} target="_blank" rel="noopener noreferrer"
            className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Track on Map
          </a>

          <a href={`tel:${patient.phone}`} className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            Call Now
          </a>
        </div>

        <button className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition block mx-auto"
          onClick={() => navigate(-1)}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TrackRequestDonor;



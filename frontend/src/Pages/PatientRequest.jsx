// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PatientRequests = () => {
//   const navigate = useNavigate();

//   // Sample patient data (Replace with API data)
//   const [requestDetails, setRequestDetails] = useState({
//     name: "Shravani Sonawane",
//     profilePic: "data:image/png;base64,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", // Replace with actual profile URL
//     bloodGroup: "A+",
//     requestDate: "March 16, 2025",
//     status: "Pending",
//     hospital: "City Hospital, Pune",
//     location: "Pune, Maharashtra",
//   });

//   const [donors, setDonors] = useState([
//     { id: 1, name: "John Doe", contact: "9876543210", location: "Pune" },
//     { id: 2, name: "Jane Smith", contact: "9123456789", location: "Mumbai" },
//   ]);

//   const [bloodBanks, setBloodBanks] = useState([
//     { id: 1, name: "Red Cross Blood Bank", address: "Pune", contact: "1234567890" },
//     { id: 2, name: "Lifeline Blood Bank", address: "Mumbai", contact: "0987654321" },
//   ]);

//   return (
//     <div className="min-h-screen bg-red-100 flex justify-center items-center p-6">
//       {/* Two-column layout */}
//       <div className="max-w-6xl w-full bg-white p-8 rounded-xl shadow-lg border-2 border-red-300 flex flex-col md:flex-row">
        
//         {/* Left Section: Patient Request */}
//         <div className="w-full md:w-1/2 bg-red-50 p-6 rounded-xl shadow-md border border-red-300 flex flex-col items-center text-center">
//           <img src={requestDetails.profilePic} alt="Patient" className="w-32 h-32 rounded-full border-4 border-red-500" />
//           <h3 className="text-2xl font-semibold text-gray-800 mt-4">{requestDetails.name}</h3>
//           <p className="text-gray-700"><strong>Blood Group:</strong> <span className="text-red-600">{requestDetails.bloodGroup}</span></p>
//           <p className="text-gray-700"><strong>Hospital:</strong> {requestDetails.hospital}</p>
//           <p className="text-gray-700"><strong>Location:</strong> {requestDetails.location}</p>
//           <p className="text-gray-700"><strong>Request Date:</strong> {requestDetails.requestDate}</p>
//           <p className="text-lg font-semibold text-red-700 mt-2"><strong>Status:</strong> {requestDetails.status}</p>

//           {/* Track Request Button (Navigates to Tracking Page) */}
//           <button
//             className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
//             onClick={() => navigate("/track-request")}
//           >
//             Track Request
//           </button>
//         </div>

//         {/* Right Section: Donors & Blood Banks */}
//         <div className="w-full md:w-1/2 p-6">
//           {/* Donors */}
//           <div className="mb-6">
//             <h3 className="text-2xl font-semibold text-gray-800 border-b-4 border-red-500 pb-2">Accepted Donors</h3>
//             {donors.length > 0 ? (
//               <ul className="mt-4 space-y-4">
//                 {donors.map((donor) => (
//                   <li key={donor.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-300">
//                     <p className="text-lg font-semibold text-gray-800">{donor.name}</p>
//                     <p className="text-gray-600"><strong>Contact:</strong> {donor.contact}</p>
//                     <p className="text-gray-600"><strong>Location:</strong> {donor.location}</p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600 mt-2">No donors have accepted yet.</p>
//             )}
//           </div>

//           {/* Blood Banks */}
//           <div>
//             <h3 className="text-2xl font-semibold text-gray-800 border-b-4 border-red-500 pb-2">Nearby Blood Banks</h3>
//             {bloodBanks.length > 0 ? (
//               <ul className="mt-4 space-y-4">
//                 {bloodBanks.map((bank) => (
//                   <li key={bank.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-300 flex justify-between items-center">
//                     <div>
//                       <p className="text-lg font-semibold text-gray-800">{bank.name}</p>
//                       <p className="text-gray-600"><strong>Address:</strong> {bank.address}</p>
//                       <p className="text-gray-600"><strong>Contact:</strong> {bank.contact}</p>
//                     </div>
//                     <button
//                       className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
//                       onClick={() => alert(`Request sent to ${bank.name}`)}

//                     >
//                       Request Blood
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600 mt-2">No blood banks found nearby.</p>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PatientRequests;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PatientRequestCard from "../Components/PatientCard"; // Ensure correct import

const API_BASE_URL = "/api/v3"; // Define API base URL

const PatientRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch patient details
        const response = await axios.get(`${API_BASE_URL}/details`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (response.data.success) {
          setPatient(response.data.patient);
          setRequests(response.data.patient.requests || []);
        } else {
          setError(response.data.message || "Failed to fetch patient details.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_BASE_URL}/request/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(requests.filter((request) => request._id !== id));
      } catch (err) {
        setError("Failed to delete the request.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">Your Blood Requests</h2>

      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold shadow-lg"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Display Patient Details */}
          {patient && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 text-center">Patient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-gray-700">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Address:</strong> {patient.address}</p>
                <p><strong>Previous Donors:</strong> {patient.previousDonors?.length || 0}</p>
                <p><strong>Medical History:</strong> {patient.medicalHistory || "Not Available"}</p>
                <p><strong>Last Donation Date:</strong> {patient.lastDonationDate || "Not Available"}</p>
              </div>
            </div>
          )}

          {/* Display Requests */}
          {requests.length > 0 ? (
            <div className="grid gap-6">
              {requests.map((request) => (
                <PatientRequestCard key={request._id} request={request} handleDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No blood requests found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PatientRequests;




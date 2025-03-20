
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:3000/api/v4";

// const RequestCard = ({ request, onAccept }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const { _id, patientId, status } = request;
//   if (!patientId) return null;

//   const {
//     name: patient_name,
//     bloodType,
//     location,
//     guardian_name,
//     phone,
//     email,
//     hospital,
//     urgency,
//     photo,
//   } = patientId;

//   const handleDonateNow = async () => {
//     setLoading(true);
//     setMessage(null);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Unauthorized: Please log in first.");

//       const { data } = await axios.put(
//         `${API_BASE_URL}/accept/${_id}`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data.success) {
//         setMessage("✅ Blood request accepted successfully! Emails sent.");
//         onAccept(_id);
//         setTimeout(() => navigate("/request-donor-track"), 2000);
//       } else {
//         throw new Error(data.message || "Failed to accept request.");
//       }
//     } catch (error) {
//       setMessage(`❌ ${error.response?.data?.message || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl bg-base-100 shadow-lg border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-6 rounded-xl flex flex-col items-center">
//       <figure className="p-4">
//         <img
//           className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-sm"
//           src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//           alt="Profile"
//           onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
//         />
//       </figure>

//       <div className="w-full text-center">
//         <h2 className="text-xl font-semibold text-gray-800">{patient_name}</h2>
//         <p className="text-md text-gray-600"><strong>Blood Group:</strong> {bloodType}</p>
//         <p className="text-md text-gray-600"><strong>Location:</strong> {location}</p>
//         {hospital && <p className="text-md text-gray-600"><strong>Hospital:</strong> {hospital}</p>}
//         {urgency && <p className="text-md text-red-500"><strong>Urgency:</strong> {urgency}</p>}
//         {guardian_name && <p className="text-md text-gray-600"><strong>Guardian:</strong> {guardian_name}</p>}
//         {phone && <p className="text-md text-gray-600"><strong>Phone:</strong> {phone}</p>}
//         {email && <p className="text-md text-gray-600"><strong>Email:</strong> {email}</p>}
//       </div>

//       {status === "Accepted" ? (
//         <p className="text-green-600 font-semibold text-lg mt-4">✅ Request Accepted</p>
//       ) : (
//         <button
//           onClick={handleDonateNow}
//           disabled={loading}
//           className="mt-6 btn bg-red-600 hover:bg-red-800 text-white py-3 px-6 rounded-lg transition-all duration-300 text-lg"
//         >
//           {loading ? "Processing..." : "Donate Now"}
//         </button>
//       )}

//       {message && (
//         <p className={`mt-3 text-md font-semibold ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default RequestCard;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v4";

const RequestCard = ({ request, onAccept }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const { _id, patientId, status } = request;
  if (!patientId) return null;

  const {
    name: patient_name,
    bloodType,
    location,
    guardian_name,
    phone,
    email,
    hospital,
    urgency,
    photo,
  } = patientId;

  const handleDonateNow = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const { data } = await axios.put(
        `${API_BASE_URL}/accept/${_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setMessage("✅ Blood request accepted successfully! Emails sent.");
        onAccept(_id);

        // Pass patientId while navigating to TrackRequestDonor
        setTimeout(() => navigate(`/request-donor-track/${_id}`), 2000);
      } else {
        throw new Error(data.message || "Failed to accept request.");
      }
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-base-100 shadow-lg border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-6 rounded-xl flex flex-col items-center">
      <figure className="p-4">
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="Profile"
          onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
        />
      </figure>

      <div className="w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800">{patient_name}</h2>
        <p className="text-md text-gray-600"><strong>Blood Group:</strong> {bloodType}</p>
        <p className="text-md text-gray-600"><strong>Location:</strong> {location}</p>
        {hospital && <p className="text-md text-gray-600"><strong>Hospital:</strong> {hospital}</p>}
        {urgency && <p className="text-md text-red-500"><strong>Urgency:</strong> {urgency}</p>}
        {guardian_name && <p className="text-md text-gray-600"><strong>Guardian:</strong> {guardian_name}</p>}
        {phone && <p className="text-md text-gray-600"><strong>Phone:</strong> {phone}</p>}
        {email && <p className="text-md text-gray-600"><strong>Email:</strong> {email}</p>}
      </div>

      {status === "Accepted" ? (
        <p className="text-green-600 font-semibold text-lg mt-4">✅ Request Accepted</p>
      ) : (
        <button
          onClick={handleDonateNow}
          disabled={loading}
          className="mt-6 btn bg-red-600 hover:bg-red-800 text-white py-3 px-6 rounded-lg transition-all duration-300 text-lg"
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      )}

      {message && (
        <p className={`mt-3 text-md font-semibold ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default RequestCard;



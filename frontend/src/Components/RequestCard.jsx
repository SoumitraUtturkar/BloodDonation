// import React from "react";
// import { Link } from "react-router-dom";

// const RequestCard = ({ request }) => {
//   const {
//     _id,
//     patientId, // Contains full patient details
//     createdAt,
//   } = request;

//   // Ensure patientId exists before accessing properties
//   if (!patientId) {
//     return null;
//   }

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

//   return (
//     <div className="card bg-base-100 shadow-md border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-4 rounded-xl flex items-center">
//       <figure className="p-4">
//         <img
//           className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
//           src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
//           alt="Profile"
//           onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
//         />
//       </figure>

//       <div className="card-body">
//         <h2 className="card-title text-lg font-semibold text-gray-800">{patient_name}</h2>
//         <p className="text-sm text-gray-600"><strong>Blood Group:</strong> {bloodType}</p>
//         <p className="text-sm text-gray-600"><strong>Location:</strong> {location}</p>
//         {hospital && <p className="text-sm text-gray-600"><strong>Hospital:</strong> {hospital}</p>}
//         {urgency && <p className="text-sm text-red-500"><strong>Urgency:</strong> {urgency}</p>}
//         {guardian_name && <p className="text-sm text-gray-600"><strong>Guardian:</strong> {guardian_name}</p>}
//         {phone && <p className="text-sm text-gray-600"><strong>Phone:</strong> {phone}</p>}
//         {email && <p className="text-sm text-gray-600"><strong>Email:</strong> {email}</p>}

//         <div className="card-actions justify-end">
//           <Link to={`/request-donor-track/${_id}`} state={{ request }}>
//             <button className="btn bg-red-600 hover:bg-red-800 text-white py-2 px-5 rounded-lg transition-all duration-300 mt-4">
//               Donate Now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RequestCard;

import React from "react";
import { Link } from "react-router-dom";

const RequestCard = ({ request }) => {
  const {
    _id,
    patientId, // Contains full patient details
    createdAt,
  } = request;

  // Ensure patientId exists before accessing properties
  if (!patientId) {
    return null;
  }

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
    previousDonors, // Array of previous donors
  } = patientId;

  return (
    <div className="card bg-base-100 shadow-md border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-4 rounded-xl flex items-center">
      {/* Profile Image */}
      <figure className="p-4">
        <img
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="Profile"
          onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
        />
      </figure>

      {/* Patient Details */}
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold text-gray-800">{patient_name}</h2>
        <p className="text-sm text-gray-600"><strong>Blood Group:</strong> {bloodType}</p>
        <p className="text-sm text-gray-600"><strong>Location:</strong> {location}</p>
        {hospital && <p className="text-sm text-gray-600"><strong>Hospital:</strong> {hospital}</p>}
        {urgency && <p className="text-sm text-red-500"><strong>Urgency:</strong> {urgency}</p>}
        {guardian_name && <p className="text-sm text-gray-600"><strong>Guardian:</strong> {guardian_name}</p>}
        {phone && <p className="text-sm text-gray-600"><strong>Phone:</strong> {phone}</p>}
        {email && <p className="text-sm text-gray-600"><strong>Email:</strong> {email}</p>}

        {/* Previous Donors Section */}
        {previousDonors && previousDonors.length > 0 ? (
          <div className="mt-3">
            <h3 className="text-md font-semibold text-gray-700">Previous Donors:</h3>
            <ul className="list-disc ml-4 text-sm text-gray-600">
              {previousDonors.map((donor, index) => (
                <li key={index} className="mt-1">
                  {donor.name} ({donor.bloodType})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-3"><strong>Previous Donors:</strong> None</p>
        )}

        {/* Donate Now Button */}
        <div className="card-actions justify-end">
          <Link to={`/request-donor-track/${_id}`} state={{ request }}>
            <button className="btn bg-red-600 hover:bg-red-800 text-white py-2 px-5 rounded-lg transition-all duration-300 mt-4">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;

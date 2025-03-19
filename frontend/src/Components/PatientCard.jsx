import React from "react";
import { useNavigate } from "react-router-dom";

const PatientRequestCard = ({ request, handleDelete }) => {
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (confirmDelete) {
      await handleDelete(request._id);
    }
  };

  return (
    <div className="w-full bg-gray-100 shadow-md border border-gray-300 hover:border-red-500 transition-all duration-300 p-6 rounded-lg flex flex-col md:flex-row gap-6 items-center">
      <figure className="flex-shrink-0">
        <img
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-400 shadow-md"
          src={request.photo}
          alt="Profile"
          onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
        />
      </figure>

      <div className="flex-1 text-gray-800 w-full">
        <h2 className="text-xl font-bold text-center text-red-700 mb-3">
          {request.patient_name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <p><span className="font-medium">Guardian:</span> {request.guardian_name}</p>
            <p><span className="font-medium">Email:</span> {request.email}</p>
            <p><span className="font-medium">Phone:</span> {request.phone}</p>
          </div>
          <div>
            <p><span className="font-medium">Blood Type:</span> {request.bloodType}</p>
            <p><span className="font-medium">Hospital:</span> {request.hospital}</p>
            <p><span className="font-medium">Location:</span> {request.location}</p>
          </div>
        </div>

        <div className="flex justify-center md:justify-end gap-4 mt-4">
          <button
            onClick={() => navigate(`/edit-request/${request._id}`)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Modify
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRequestCard;

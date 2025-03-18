import React from "react";
import { useNavigate } from "react-router-dom";

const PatientRequestCard = ({ request, handleDelete }) => {
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (confirmDelete) {
      await handleDelete(request._id);  // This function handles API call & redirect
    }
  };

  return (
    <div className="w-4/5 mx-auto bg-white shadow-lg border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-8 rounded-xl flex gap-8 items-center mb-10">
      <figure className="flex-shrink-0">
        <img
          className="w-44 h-44 rounded-full object-cover border-4 border-gray-200 shadow-md"
          src={request.photo}
          alt="Profile"
          onError={(e) =>
            (e.target.src =
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
          }
        />
      </figure>

      <div className="flex-1 text-gray-800">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-6">
          {request.patient_name}
        </h2>

        <div className="grid grid-cols-2 gap-6 text-lg">
          <div>
            <p><span className="font-medium">Guardian Name:</span> {request.guardian_name}</p>
            <p><span className="font-medium">Email:</span> {request.email}</p>
            <p><span className="font-medium">Phone:</span> {request.phone}</p>
          </div>
          <div>
            <p><span className="font-medium">Blood Type:</span> {request.bloodType}</p>
            <p><span className="font-medium">Hospital:</span> {request.hospital}</p>
            <p><span className="font-medium">Location:</span> {request.location}</p>
          </div>
        </div>

        <div className="flex justify-end gap-8 mt-8">
          <button
            onClick={() => navigate(`/edit-request/${request._id}`)}
            className="bg-green-600 hover:bg-green-800 text-white py-3 px-8 rounded-lg shadow-md transition-all duration-300"
          >
            Modify
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-600 hover:bg-red-800 text-white py-3 px-8 rounded-lg shadow-md transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRequestCard;

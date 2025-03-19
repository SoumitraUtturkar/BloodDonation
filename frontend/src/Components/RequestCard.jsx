import React from "react";
import { Link } from "react-router-dom";

const RequestCard = (props) => {
  const {
    _id,
    patient_name,
    bloodType,
    location,
    guardian_name,
    phone,
    email,
    hospital,
    photo,
    createdAt,
  } = props;

  return (
    <div className="card card-side bg-base-100 shadow-md border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-4 rounded-xl flex items-center">
      <figure className="p-4">
        <img
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          src={photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
          alt="Profile"
          onError={(e) =>
            (e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
          }
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold text-gray-800">{patient_name}</h2>
        <p className="text-sm text-gray-600">{bloodType} Blood Group</p>
        <p className="text-sm text-gray-600">{location}</p>
        <div className="card-actions justify-end">
          <Link to={`/request-donor-track/${_id}`} state={props}>
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

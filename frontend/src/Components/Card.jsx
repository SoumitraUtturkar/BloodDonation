import React from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  return (
    <div className="card card-side bg-base-100 shadow-md border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-4 rounded-xl flex items-center">
      <figure className="p-4">
        <img
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Default profile icon
          alt="Profile"
          onError={(e) =>
            (e.target.src =
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")
          } // Fallback if image fails to load
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold text-gray-800">
          Add card title
        </h2>
        <p className="text-sm text-gray-600">Click the button to like this.</p>
        <div className="card-actions justify-end">
          <button className="btn bg-red-600 hover:bg-red-800 text-white py-2 px-5 rounded-lg transition-all duration-300 mt-4">
            Saved N lives
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
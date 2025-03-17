import React from "react";
import { useNavigate } from "react-router-dom";

const TrackRequest = () => {
  const navigate = useNavigate();

  // Sample accepted donors and blood banks (Replace with real data)
  const acceptedEntities = [
    { 
      type: "Donor", 
      name: "John Doe", 
      contact: "9876543210", 
      location: "Pune", 
      mapLink: "https://maps.google.com/?q=Pune" 
    },
    { 
      type: "Blood Bank", 
      name: "Red Cross Blood Bank", 
      contact: "1234567890", 
      location: "Mumbai", 
      mapLink: "https://maps.google.com/?q=Mumbai" 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-100 to-red-200 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-xl border border-red-300">
        {/* Title */}
        <h2 className="text-4xl font-bold text-red-700 text-center mb-6">
          Track Your Blood Request
        </h2>
        
        {/* Request Status Box */}
        <div className="bg-red-50 p-4 rounded-lg shadow-md border border-red-300 text-center mb-6">
          <p className="text-lg font-semibold text-gray-800">
            Your blood request is being processed.
          </p>
          <p className="text-gray-600 mt-1">
            Below are the details of the donors or blood banks who have accepted your request.
          </p>
        </div>

        {/* List of Accepted Donors/Blood Banks */}
        <ul className="space-y-6">
          {acceptedEntities.map((entity, index) => (
            <li key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex flex-col md:flex-row justify-between items-center">
              {/* Donor/Blood Bank Details */}
              <div className="text-center md:text-left">
                <p className="text-2xl font-semibold text-gray-800">{entity.type}: {entity.name}</p>
                <p className="text-gray-600 mt-1"><strong>Location:</strong> {entity.location}</p>
                <p className="text-gray-600"><strong>Contact:</strong> {entity.contact}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 md:mt-0 flex gap-4">
                {/* Map Tracking Button */}
                <a 
                  href={entity.mapLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Track on Map
                </a>

                {/* Call Donor/Blood Bank Button */}
                <a 
                  href={`tel:${entity.contact}`} 
                  className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
                >
                  Call Now
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Back Button */}
        <button
          className="mt-8 px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition block mx-auto"
          onClick={() => navigate(-1)}
        >
          Back to Requests
        </button>
      </div>
    </div>
  );
};

export default TrackRequest;
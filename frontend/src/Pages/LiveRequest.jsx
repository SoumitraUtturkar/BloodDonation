import React, { useState } from "react";
import RequestCard from "../Components/RequestCard"; // Import RequestCard component
import Button from "../Components/Button";

const DonateBlood = () => {
  const [search, setSearch] = useState("");

  // Sample data (replace with API call or state)
  const urgentRequests = [
    { id: 1, name: "Aniruddha Patil", bloodGroup: "A+", location: "Pune", profilePhoto: "profile1.jpg" },
    { id: 2, name: "Sujal Mehta", bloodGroup: "B-", location: "Mumbai", profilePhoto: "profile2.jpg" },
  ];

  const normalRequests = [
    { id: 3, name: "Onkar Joshi", bloodGroup: "O+", location: "Nagpur", profilePhoto: "profile3.jpg" },
    { id: 4, name: "Amey Deshmukh", bloodGroup: "AB+", location: "Chennai", profilePhoto: "profile4.jpg" },
  ];

  const filteredUrgentRequests = urgentRequests.filter((req) =>
    req.name.toLowerCase().includes(search.toLowerCase()) ||
    req.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
    req.location.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNormalRequests = normalRequests.filter((req) =>
    req.name.toLowerCase().includes(search.toLowerCase()) ||
    req.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
    req.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8 space-y-16">
      
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-red-700 mb-6">Donate Blood</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name, blood group, or location..."
          className="w-full max-w-4xl px-6 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Urgent Blood Requests Section */}
      <section className="bg-red-50 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-red-700 mb-6">Urgent Blood Requests</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          These are the most urgent blood requests that need your immediate attention. Help save a life today!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredUrgentRequests.length > 0 ? (
            filteredUrgentRequests.map((req) => (
              <RequestCard key={req.id} {...req} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No matching urgent requests found.</p>
          )}
        </div>
      </section>

      {/* Normal Blood Requests Section */}
      <section className="bg-yellow-50 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg mt-16">
        <h2 className="text-4xl font-bold text-yellow-700 mb-6">Normal Blood Requests</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          These blood requests are important but not as urgent. Your contribution can still make a significant difference.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredNormalRequests.length > 0 ? (
            filteredNormalRequests.map((req) => (
              <RequestCard key={req.id} {...req} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No matching normal requests found.</p>
          )}
        </div>
      </section>

      {/* Donate to Blood Bank Section */}
      <section className="bg-blue-50 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg mt-16">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">Donate to Blood Banks</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          If you don’t see a specific request, consider donating to a blood bank near you to help save lives.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Example blood bank cards */}
          <div className="card bg-white shadow-md rounded-lg p-6 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800">Pune Blood Bank</h3>
            <p className="text-sm text-gray-600">Location: Pune</p>
            <p className="text-sm text-gray-600">Contact: 123-456-7890</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300">
              Donate Here
            </button>
          </div>
          <div className="card bg-white shadow-md rounded-lg p-6 hover:border-blue-500 transition-all duration-300">
            <h3 className="text-xl font-semibold text-gray-800">Mumbai Blood Bank</h3>
            <p className="text-sm text-gray-600">Location: Mumbai</p>
            <p className="text-sm text-gray-600">Contact: 234-567-8901</p>
            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300">
              Donate Here
            </button>
          </div>
          {/* Repeat for other blood banks */}
        </div>
      </section>
    </div>
  );
};

export default DonateBlood;

import React, { useState } from "react";
import RequestCard from "../Components/RequestCard"; // Request card component
import Button from "../Components/Button";

const BloodBankLanding = () => {
  const [search, setSearch] = useState("");

  // Sample live requests (Replace with API calls)
  const liveRequests = [
    { id: 1, name: "Amit Sharma", bloodGroup: "O+", location: "Pune", profilePhoto: "profile1.jpg" },
    { id: 2, name: "Priya Verma", bloodGroup: "B+", location: "Mumbai", profilePhoto: "profile2.jpg" },
  ];

  // Requests that the blood bank has sent
  const bloodBankRequests = [
    { id: 3, name: "Rohit Mehta", bloodGroup: "A-", location: "Nagpur", profilePhoto: "profile3.jpg" },
    { id: 4, name: "Sana Khan", bloodGroup: "AB+", location: "Delhi", profilePhoto: "profile4.jpg" },
  ];

  // Search filter
  const filteredLiveRequests = liveRequests.filter((req) =>
    req.name.toLowerCase().includes(search.toLowerCase()) ||
    req.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
    req.location.toLowerCase().includes(search.toLowerCase())
  );

  const filteredBloodBankRequests = bloodBankRequests.filter((req) =>
    req.name.toLowerCase().includes(search.toLowerCase()) ||
    req.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
    req.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-cover bg-center p-8 space-y-16">
      
      {/* Page Title */}
      <h1 className="text-5xl font-bold text-red-700 mb-6">Blood Bank Dashboard</h1>

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

      {/* Live Blood Requests Section */}
      <section className="bg-red-50 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-red-700 mb-6">Live Patient Requests</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          These are the latest blood requests from patients. Act fast and help save lives.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredLiveRequests.length > 0 ? (
            filteredLiveRequests.map((req) => (
              <RequestCard key={req.id} {...req} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No live requests available.</p>
          )}
        </div>
      </section>

      {/* Blood Bank Sent Requests Section */}
      <section className="bg-blue-50 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg mt-16">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">Requests Sent to Blood Bank</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          These requests were sent by the blood bank to find donors or other banks for availability.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredBloodBankRequests.length > 0 ? (
            filteredBloodBankRequests.map((req) => (
              <RequestCard key={req.id} {...req} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No requests sent to blood bank.</p>
          )}
        </div>
      </section>

      {/* Blood Bank Options */}
      <section className="bg-gray-100 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg mt-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Manage Blood Bank Requests</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <Button text="View Requests" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md" />
          <Button text="Track Requests" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md" />
        </div>
      </section>
      
    </div>
  );
};

export default BloodBankLanding;
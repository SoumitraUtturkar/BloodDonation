import { useEffect, useState } from "react";
import RequestCard from "../Components/RequestCard";

const DonateBlood = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch blood donation requests
  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized - Please log in first");
      }

      const response = await fetch("http://localhost:3000/api/v2/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
      }

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format: Expected JSON but received HTML.");
      }

      const data = await response.json();
      setRequests(data.requests);
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filter requests based on search input
  const filteredRequests = requests.filter((req) =>
    req.patient_name.toLowerCase().includes(search.toLowerCase()) ||
    req.bloodType.toLowerCase().includes(search.toLowerCase()) ||
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

      {/* Display Loading or Error Messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Blood Requests Section */}
      <section className="w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg bg-gray-50">
        <h2 className="text-4xl font-bold text-red-700 mb-6">Blood Donation Requests</h2>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          These are the active blood requests. Help save a life today!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <RequestCard
                key={req._id}
                name={req.patient_name}
                guardian={req.guardian_name}
                bloodGroup={req.bloodType}
                location={req.location}
                phone={req.phone}
                email={req.email}
                hospital={req.hospital}
                photo={req.photo}
                createdAt={req.createdAt}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No matching requests found.</p>
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
        </div>
      </section>
    </div>
  );
};

export default DonateBlood;








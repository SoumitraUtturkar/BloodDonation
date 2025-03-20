// import { useEffect, useState } from "react";
// import RequestCard from "../Components/RequestCard";

// const DonateBlood = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");

//   const fetchRequests = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Unauthorized - Please log in first");

//       const response = await fetch("/api/v4/all", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
//       }

//       const data = await response.json();
//       if (data.success && data.bloodRequests) {
//         setRequests(data.bloodRequests);
//       } else {
//         throw new Error("Failed to fetch blood requests.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   // ✅ Function to update the UI when a request is accepted
//   const handleAcceptRequest = (requestId) => {
//     setRequests((prevRequests) =>
//       prevRequests.map((req) =>
//         req._id === requestId ? { ...req, status: "Accepted" } : req
//       )
//     );
//   };

//   // Filter requests based on search input
//   const filteredRequests = requests.filter((req) => {
//     const patient = req.patientId;
//     return (
//       patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
//       patient?.bloodType?.toLowerCase().includes(search.toLowerCase()) ||
//       patient?.location?.toLowerCase().includes(search.toLowerCase()) ||
//       patient?.hospital?.toLowerCase().includes(search.toLowerCase()) ||
//       patient?.urgency?.toLowerCase().includes(search.toLowerCase())
//     );
//   });

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8 space-y-16">
//       <h1 className="text-5xl font-bold text-red-700 mb-6">Donate Blood</h1>

//       <input
//         type="text"
//         placeholder="Search by name, blood type, location, hospital, or urgency..."
//         className="w-full max-w-4xl px-6 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {filteredRequests.length > 0 ? (
//           filteredRequests.map((req) => (
//             <RequestCard key={req._id} request={req} onAccept={handleAcceptRequest} />
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-3">No matching requests found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DonateBlood;
import { useEffect, useState } from "react";
import RequestCard from "../Components/RequestCard";

const DonateBlood = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized - Please log in first");

      const response = await fetch("/api/v4/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.bloodRequests) {
        setRequests(data.bloodRequests);
      } else {
        throw new Error("Failed to fetch blood requests.");
      }
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

  // ✅ Function to update the UI when a request is accepted
  const handleAcceptRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req._id === requestId ? { ...req, status: "Accepted" } : req
      )
    );
  };

  // Filter requests based on multiple search criteria using "|" (OR), showing only requests that are not yet accepted
  const filteredRequests = requests.filter((req) => {
    const patient = req.patientId;
    const searchRegex = new RegExp(search, "i");
    return (
      req.status !== "Accepted" &&
      (
        searchRegex.test(patient?.name) ||
        searchRegex.test(patient?.bloodType) ||
        searchRegex.test(patient?.location) ||
        searchRegex.test(patient?.hospital) ||
        searchRegex.test(patient?.urgency) ||
        searchRegex.test(req.status)
      )
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8 space-y-16">
      <h1 className="text-5xl font-bold text-red-700 mb-6">Donate Blood</h1>

      <input
        type="text"
        placeholder="Search by name, blood type, location, hospital, urgency, or status..."
        className="w-full max-w-4xl px-6 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <RequestCard key={req._id} request={req} onAccept={handleAcceptRequest} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-3">No matching requests found.</p>
        )}
      </div>
    </div>
  );
};

export default DonateBlood;
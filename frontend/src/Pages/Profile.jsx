import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/v5/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:` Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-lg rounded-2xl bg-white">
      <h2 className="text-3xl font-semibold mb-6 text-red-600">User Profile</h2>

      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <p><span className="font-semibold">Name:</span> {profile.name}</p>
        <p><span className="font-semibold">Email:</span> {profile.email}</p>
        <p><span className="font-semibold">Account Type:</span> {profile.accountType}</p>
      </div>

      {profile.accountType === "patient" && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <p><span className="font-semibold">Blood Type:</span> {profile.bloodType || "N/A"}</p>
          <p><span className="font-semibold">Gender:</span> {profile.gender || "N/A"}</p>
          <p><span className="font-semibold">Hospital:</span> {profile.hospital || "N/A"}</p>
          <p><span className="font-semibold">Urgency:</span> {profile.urgency || "N/A"}</p>
          <p><span className="font-semibold">Status:</span> {profile.status || "N/A"}</p>
        </div>
      )}

      {profile.accountType === "donor" && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <p><span className="font-semibold">Blood Type:</span> {profile.bloodType || "N/A"}</p>
          <p><span className="font-semibold">Gender:</span> {profile.gender || "N/A"}</p>
          <p><span className="font-semibold">Last Donation Date:</span> {profile.lastDonationDate || "N/A"}</p>
          <p><span className="font-semibold">Is Eligible:</span> {profile.isEligible ? "Yes" : "No"}</p>
        </div>
      )}

      {/* Previous Donors Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-red-600">Previous Donors</h3>
        {profile.previousDonors && profile.previousDonors.length > 0 ? (
          profile.previousDonors.map((donor, index) => (
            <div key={index} className="card card-side bg-base-100 shadow-md border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-4 rounded-xl flex items-center mb-4">
              <figure className="p-4">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Donor"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-gray-800">{donor.name}</h2>
                <p className="text-sm text-gray-600">Blood Type: {donor.bloodType || "N/A"}</p>
                <p className="text-sm text-gray-600">Contact: {donor.contactNumber || "N/A"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No previous donors found.</p>
        )}
      </div>

      {/* Previous Donations Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-red-600">Previous Donations</h3>
        {profile.donatedPatients && profile.donatedPatients.length > 0 ? (
          profile.donatedPatients.map((patient, index) => (
            <div key={index} className="card card-side bg-base-100 shadow-md border-2 border-gray-300 hover:border-red-500 transition-all duration-300 p-4 rounded-xl flex items-center mb-4">
              <figure className="p-4">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="Patient"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold text-gray-800">{patient.name}</h2>
                <p className="text-sm text-gray-600">Blood Type: {patient.bloodType || "N/A"}</p>
                <p className="text-sm text-gray-600">Contact: {patient.contactNumber || "N/A"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No previous donations found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
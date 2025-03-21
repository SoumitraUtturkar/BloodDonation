import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile...");
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/v5/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        console.log("Profile data received:", data);
        setProfile(data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading profile...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-lg rounded-2xl bg-white">
      <h2 className="text-3xl font-semibold mb-6 text-red-600">User Profile</h2>

      {/* Basic User Details */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">General Details</h3>
        <p><span className="font-semibold">Name:</span> {profile.name}</p>
        <p><span className="font-semibold">Email:</span> {profile.email}</p>
        <p><span className="font-semibold">Account Type:</span> {profile.accountType}</p>
        <p><span className="font-semibold">Joined On:</span> {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Previous Donors Section */}
      {profile.previousDonors?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-red-600">Previous Donors</h3>
          {profile.previousDonors.map((donor, index) => (
            <div key={index} className="bg-white shadow-md border border-gray-300 hover:border-red-500 transition-all duration-300 p-4 rounded-xl flex items-center mb-4">
              <figure className="p-4">
                <img className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-sm" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Donor" />
              </figure>
              <div className="pl-4">
                <h2 className="text-lg font-semibold text-gray-800">{donor.name}</h2>
                <p className="text-sm text-gray-600">Blood Type: {donor.bloodType || "N/A"}</p>
                <p className="text-sm text-gray-600">Contact: {donor.contactNumber || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Patient Details */}
      {(profile.hospital || profile.status) && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-red-500">Patient Details</h3>
          <p><span className="font-semibold">Blood Type:</span> {profile.bloodType || "N/A"}</p>
          <p><span className="font-semibold">Gender:</span> {profile.gender || "N/A"}</p>
          <p><span className="font-semibold">Age:</span> {profile.age || "N/A"}</p>
          <p><span className="font-semibold">Location:</span> {profile.location || "N/A"}</p>
          <p><span className="font-semibold">Contact:</span> {profile.contactNumber || "N/A"}</p>
          <p><span className="font-semibold">Hospital:</span> {profile.hospital || "N/A"}</p>
          <p><span className="font-semibold">Urgency:</span> {profile.urgency || "N/A"}</p>
          <p><span className="font-semibold">Status:</span> {profile.status || "N/A"}</p>
        </div>
      )}

      {/* Donor Details */}
      {(profile.lastDonationDate || profile.isEligible !== undefined) && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-red-500">Donor Details</h3>
          <p><span className="font-semibold">Blood Type:</span> {profile.bloodType || "N/A"}</p>
          <p><span className="font-semibold">Gender:</span> {profile.gender || "N/A"}</p>
          <p><span className="font-semibold">Age:</span> {profile.age || "N/A"}</p>
          <p><span className="font-semibold">Location:</span> {profile.location || "N/A"}</p>
          <p><span className="font-semibold">Contact:</span> {profile.contactNumber || "N/A"}</p>
          <p>
            <span className="font-semibold">Last Donation Date:</span>{" "}
            {profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <span className="font-semibold">Is Eligible:</span>{" "}
            {profile.isEligible ? <span className="text-green-600 font-bold">Yes</span> : <span className="text-red-600 font-bold">No</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;

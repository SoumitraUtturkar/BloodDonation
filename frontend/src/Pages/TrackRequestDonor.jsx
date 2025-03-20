import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v3";

const TrackRequestDonor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatientDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      const response = await axios.get(`${API_BASE_URL}/details/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPatient(response.data.patient);
      } else {
        throw new Error("Patient not found.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error fetching patient details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientDetails();
  }, [id]);

  const handleRejectRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");

      await axios.post(
        `${API_BASE_URL}/reject/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Request rejected successfully");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Error rejecting request");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-lg text-gray-600">
        ⏳ Loading patient details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-red-600">
        ❌ {error}
        <button
          onClick={fetchPatientDetails}
          className="mt-4 px-5 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-800 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  const mapSearchLink = patient.hospital
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(patient.hospital)}`
    : "#";

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-red-100 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-300">
        <h2 className="text-3xl font-bold text-red-700 text-center mb-6">🩸 Track Your Accepted Patient</h2>
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <img
            src={patient.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Patient"
            className="w-28 h-28 rounded-full border-4 border-gray-300 shadow-md"
          />
          <div className="text-center md:text-left ml-4">
            <p className="text-xl font-semibold text-gray-800">Patient: {patient.name}</p>
            <p className="text-gray-700 mt-1"><strong>Blood Type:</strong> {patient.bloodType}</p>
            <p className="text-gray-700"><strong>Hospital:</strong> {patient.hospital}</p>
            <p className="text-gray-700"><strong>Location:</strong> {patient.location}</p>
            <p className="text-gray-700"><strong>Contact:</strong> {patient.phone}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          {patient.hospital && (
            <a 
              href={mapSearchLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              📍 Track on Map
            </a>
          )}
          {patient.phone && (
            <a 
              href={`tel:${patient.phone}`} 
              className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
            >
              📞 Call Now
            </a>
          )}
        </div>
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button
            className="px-6 py-3 bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
            onClick={handleRejectRequest}
          >
            ❌ Reject Request
          </button>
        </div>
        <button
          className="mt-8 px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition block mx-auto"
          onClick={() => navigate(-1)}
        >
          ⬅️ Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default TrackRequestDonor;
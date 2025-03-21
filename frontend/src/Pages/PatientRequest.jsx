import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v4";

const PatientRequest = () => {
  const { id } = useParams(); // Blood Request ID
  const pid=id._patientId;
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: Please log in first.");

        // Fetch Blood Request Details
        const bloodRequestRes = await axios.get(`${API_BASE_URL}/blood-request/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!bloodRequestRes.data.success) throw new Error("Blood request not found.");

        const patientId = bloodRequestRes.data.bloodRequest.patientId?._id;
        if (!patientId) throw new Error("Patient details not found.");

        // Fetch Patient Details
        const patientRes = await axios.get(`http://localhost:3000/api/v3/details/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!patientRes.data.success) throw new Error("Patient details not available.");

        setPatient(patientRes.data.patient);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCompleteRequest = async () => {
    try {
      setShowModal(false);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");
  
      const response = await axios.put(`${API_BASE_URL}/complete/${id}`, {}, {
        headers: { Authorization:` Bearer ${token} `},
      });
  
      if (response.data.success) {
        navigate("/thank-you"); // Redirect to Thank You page
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Error completing request.");
    }
  };

  const handleDeleteRequest = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this request?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in first.");
  
      // Step 1: Fetch Blood Request Details
      const bloodRequestRes = await axios.get(`${API_BASE_URL}/blood-request/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!bloodRequestRes.data.success) throw new Error("Blood request not found.");
  
      const patientId = bloodRequestRes.data.bloodRequest.patientId?._id;
      if (!patientId) throw new Error("Patient details not found.");
  
      // Step 2: Fetch Patient Details
      const patientRes = await axios.get(`http://localhost:3000/api/v3/details/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!patientRes.data.success) throw new Error("Patient details retrieval failed.");
  
      // Step 3: Delete Blood Request
      const deleteRequestRes = await axios.delete(`${API_BASE_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!deleteRequestRes.data.success) throw new Error(deleteRequestRes.data.message);
  
      // Step 4: Delete Patient Record (if available)
      if (patientRes.data.patient?._id) {
        const deletePatientRes = await axios.delete(`http://localhost:3000/api/v3/delete/${patientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!deletePatientRes.data.success) throw new Error(deletePatientRes.data.message);
      }
  
      alert("Blood request and patient record deleted successfully.");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || error.message || "Error deleting request.");
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
          onClick={() => window.location.reload()}
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
        <h2 className="text-3xl font-bold text-red-700 text-center mb-6">🩸 Your Blood Request</h2>
        
        <div className="bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-row items-center md:items-start">
          <img
            src={patient.photo || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Patient"
            className="w-28 h-28 rounded-full border-4 border-gray-300 shadow-md"
          />
          <div className="text-center md:text-left ml-4 mt-4 md:mt-0">
            <p className="text-xl font-semibold text-gray-800">Patient: {patient.name}</p>
            <p className="text-gray-700 mt-1"><strong>Blood Type:</strong> {patient.bloodType}</p>
            <p className="text-gray-700"><strong>Hospital:</strong> {patient.hospital}</p>
            <p className="text-gray-700"><strong>Location:</strong> {patient.location}</p>
            <p className="text-gray-700"><strong>Contact:</strong> {patient.phone}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          
          <button
            className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={() => navigate(`/update-blood-request/${id}`)}
          >
            Modify
          </button>
          <button
            className="px-6 py-3 bg-gray-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
            onClick={() => setShowModal(true)}
          >
            ✅ Complete
          </button>
          <button
            className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
            onClick={handleDeleteRequest}
          >
            ❌ Delete
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-xl font-semibold text-red-700">Confirm Completion</h3>
            <p className="text-gray-600 mt-2">Are you sure you want to mark this request as completed?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleCompleteRequest}
                className="px-5 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
              >
                Yes, Complete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientRequest;



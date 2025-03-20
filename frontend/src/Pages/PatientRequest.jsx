import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PatientRequestCard from "../Components/PatientCard";

const PatientRequest = () => {
    const { id } = useParams();
    return (
        <div className="text-center my-4">
            <h2 className="text-xl font-semibold text-gray-700">Patient Request Details</h2>
            <p className="text-gray-500">Patient ID: {id}</p>
        </div>
    );
};

const PatientRequests = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setError("Unauthorized: Please log in first.");
      setLoading(false);
      return;
    }
    setToken(storedToken);

    if (!id) {
      setError("Patient ID is missing in the URL.");
      setLoading(false);
      return;
    }

    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`/api/v3/details/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
          withCredentials: true,
        });

        if (response.data.success) {
          setPatient(response.data.patient);
          setRequests(response.data.patient.requests || []);
        } else {
          setError(response.data.message || "Failed to fetch patient details.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id, navigate]);

  const handleDelete = async (requestId) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      try {
        await axios.delete(`/api/v3/request/${requestId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(requests.filter((request) => request._id !== requestId));
      } catch (err) {
        setError("Failed to delete the request.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">Your Blood Requests</h2>
      
      {error && <p className="text-red-500 text-center">{error}</p>}
      
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <>
          <PatientRequest />

          {patient && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 text-center">Patient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-gray-700">
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Blood Type:</strong> {patient.bloodType}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Email:</strong> {patient.email}</p>
                <p><strong>Hospital:</strong> {patient.hospital}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Location:</strong> {patient.location}</p>
                <p><strong>Urgency:</strong> {patient.urgency}</p>
                <p><strong>Contact Number:</strong> {patient.contactNumber}</p>
                <p><strong>Status:</strong> {patient.status}</p>
                <p><strong>Previous Donors:</strong> {patient.previousDonors?.length || 0}</p>
              </div>
            </div>
          )}

          {requests.length > 0 ? (
            <div className="grid gap-6">
              {requests.map((request) => (
                <PatientRequestCard key={request._id} request={request} handleDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No blood requests found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PatientRequests;
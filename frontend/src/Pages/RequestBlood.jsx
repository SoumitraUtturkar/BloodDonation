import React, { useState } from "react";
import axios from "axios";

const RequestBlood = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    phone: "",
    email: "",
    bloodGroup: "",
    hospital: "",
    location: "",
    urgency: "",
    reason: "",
    photo: null,
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    
    try {
      const response = await axios.post("http://localhost:4000/api/v3/post", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        alert("Blood request submitted successfully!");
        setFormData({
          fullName: "",
          guardianName: "",
          phone: "",
          email: "",
          bloodGroup: "",
          hospital: "",
          location: "",
          urgency: "",
          reason: "",
          photo: null,
        });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Request Blood</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Guardian Name</label>
            <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Blood Group</label>
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="" disabled>Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Hospital</label>
            <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Urgency</label>
            <select name="urgency" value={formData.urgency} onChange={handleChange} required className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="" disabled>Select Urgency</option>
              <option value="Immediate">Immediate</option>
              <option value="Within 24 hours">Within 24 hours</option>
              <option value="Within 3 days">Within 3 days</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Reason for Request</label>
            <textarea name="reason" value={formData.reason} onChange={handleChange} required rows="3" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Upload Photo (Optional)</label>
            <input type="file" name="photo" onChange={handleFileChange} accept="image/*" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-800 text-white py-3 px-4 rounded-md text-lg font-semibold transition-all duration-300">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestBlood;


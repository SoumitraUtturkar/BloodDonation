import React, { useState } from 'react';
// import axios from 'axios';

const DonateBlood = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    bloodType: '',
    location: '',
  });

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/donate-blood', formData);
      alert('Blood donor information submitted successfully!');
    } catch (error) {
      alert('Error submitting donor information. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-3xl font-bold text-red-700 mb-6 text-center">Donate Blood</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required 
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required 
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>

          {/* Blood Type */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Blood Type</label>
            <select name="bloodType" value={formData.bloodType} onChange={handleChange} required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="" disabled>Select Blood Type</option>
              {bloodTypes.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-red-600 hover:bg-red-800 text-white py-3 px-4 rounded-md text-lg font-semibold transition-all duration-300">
            Submit as Donor
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateBlood;

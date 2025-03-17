import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/v1/signup", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setSuccessMessage("Signup successful! Redirecting...");
      console.log(response.data);

      // Redirect to login page after 2 seconds
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Sign Up</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded-md mb-3"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md mb-3"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded-md mb-3"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;



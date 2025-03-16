import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", formData, { withCredentials: true });
      alert("Login successful!");
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded-md mb-3"
               value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded-md mb-3"
               value={formData.password} onChange={handleChange} required />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">Login</button>
      </form>
    </div>
  );
};

export default Login;


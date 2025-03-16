import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          Sign Up
        </h2>
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
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;

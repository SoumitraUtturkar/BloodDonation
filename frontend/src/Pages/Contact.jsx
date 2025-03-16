

import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-red-600">Contact Us</h1>
        <p className="text-lg mb-6">
          Have questions, feedback, or want to get involved? We'd love to hear from you!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
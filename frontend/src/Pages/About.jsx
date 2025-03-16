

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-red-600">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          <strong>RaktaVaahini</strong> is a platform built with compassion and technology, connecting blood donors, patients in need, and blood banks. Our mission is to create a seamless and effective ecosystem that saves lives by ensuring timely blood availability.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Every drop counts, and through RaktaVaahini, we aim to make the donation process more transparent, interactive, and responsive. With features like donor registration, patient request forms, and real-time tracking, we’re making sure help reaches the right person at the right time.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Whether you are a donor, a patient, or a blood bank representative, we welcome you to join this life-saving network. Your support makes a difference.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-red-500">Our Vision</h2>
          <p className="text-lg leading-relaxed mt-2">
            To build a nation where blood is always available to those in need — safely, swiftly, and efficiently.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-red-500">Contact Us</h2>
          <p className="text-lg mt-2">Email: support@raktavaahini.org</p>
          <p className="text-lg">Phone: +91 12345 67890</p>
        </div>
      </div>
    </div>
  );
};

export default About;
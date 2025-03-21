// src/components/PageLayout.jsx
import React from "react";

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[url('/blood-donation-bg.jpg')] bg-cover bg-center relative flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Page content with glass effect */}
      <div className="relative z-10 max-w-5xl w-full m-4 p-6 rounded-3xl backdrop-blur-md border border-red-300 bg-white/20 text-white shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
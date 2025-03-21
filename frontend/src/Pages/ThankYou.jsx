import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">🎉 Thank You!</h1>
        <p className="text-lg text-gray-700">
          Your blood request has been successfully completed.  
          <br />Your generosity and support make a real difference in saving lives. ❤
        </p>
        <p className="text-gray-500 text-sm mt-3">
          We appreciate your participation in this noble cause. If you have any feedback, feel free to reach out.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
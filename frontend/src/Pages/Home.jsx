import React from "react";
import Button from "../Components/Button";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-cover bg-center"
       // ✅ Update with your image path
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-6">
          Welcome to RaktVahini
        </h1>
        <Button
          text="Register as a Blood Bank"
          color="bg-red-500 hover:bg-red-700"
          link="/register"
        />
        <Button
          text="Request Blood"
          color="bg-blue-500 hover:bg-blue-700"
          link="/request-blood"
        />
        <Button
          text="Donate Blood"
          color="bg-green-500 hover:bg-green-700"
          link="/donate-blood"
        />
      </div>
    </div>
  );
};

export default Home;

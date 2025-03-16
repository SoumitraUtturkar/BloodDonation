import React from "react";
import Button from "../Components/Button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8">
      <div className="bg-white bg-opacity-90 p-12 rounded-xl text-center w-full max-w-3xl">
        <h1 className="text-5xl font-bold text-red-700 mb-10">
          Welcome to RaktVahini
        </h1>
        <div className="flex justify-center gap-8">
          <Button
            text="Register as a Blood Bank"
            color="bg-red-600 hover:bg-red-800 text-white py-4 px-10 rounded-lg text-xl font-semibold transition-all duration-300 w-64 h-16 flex items-center justify-center"
            link="/register"
          />
          <Button
            text="Request Blood"
            color="bg-red-600 hover:bg-red-800 text-white py-4 px-10 rounded-lg text-xl font-semibold transition-all duration-300 w-64 h-16 flex items-center justify-center"
            link="/request-blood"
          />
          <Button
            text="Donate Blood"
            color="bg-red-600 hover:bg-red-800 text-white py-4 px-10 rounded-lg text-xl font-semibold transition-all duration-300 w-64 h-16 flex items-center justify-center"
            link="/donate-blood"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;







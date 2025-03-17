import React from "react";
import Button from "../Components/Button";
import Cards from "../Components/Card";
import AboutUs from "../Components/about";// Import About Us component
import ContactUs from "../Components/Contact";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8 space-y-16">
      
      {/* Welcome Section */}
      <section className="bg-red-50 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-red-700 mb-6">Welcome to RaktVahini</h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          Saving lives one drop at a time. Join us in our mission to ensure that no one suffers due to a lack of blood.
        </p>
        <div className="flex justify-center gap-8 mt-8">
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
      </section>

      {/* Saviours Section */}
      <section className="w-full max-w-7xl text-center">
        <h1 className="text-4xl font-bold text-red-700 mb-6">Our Top Saviours</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Recognizing our heroes who have generously contributed to saving lives through blood donation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us">
        <AboutUs /> {/* This section is now scrollable via an anchor link */}
      </section>

      <section id="contact-us">
        <ContactUs /> {/* This section is now scrollable via an anchor link */}
      </section>
    </div>
  );
};

export default Home;







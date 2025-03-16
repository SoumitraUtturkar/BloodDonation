import React from "react";
import Logo from "../assets/RaktVahini_Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo & Title */}
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt="RaktVahini Logo"
            className="h-12 w-12 rounded-full border-2 border-white shadow-lg"
          />
          <h1 className="text-2xl font-bold tracking-wide">RaktVahini</h1>
        </div>

        {/* Center Section: Navigation Links */}
        <ul className="flex space-x-8 text-lg font-medium">
          <li>
            <Link
              to="/"
              className="hover:bg-white hover:text-red-600 px-4 py-2 rounded-md transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:bg-white hover:text-red-600 px-4 py-2 rounded-md transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:bg-white hover:text-red-600 px-4 py-2 rounded-md transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Section: Login & Sign Up Buttons */}
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="w-28 h-10 bg-white text-red-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-28 h-10 bg-white text-red-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



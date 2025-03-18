import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/RaktVahini_Logo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="RaktVahini Logo" className="h-12 w-12 rounded-full border-2 border-white" />
          <h1 className="text-2xl font-bold">RaktVahini</h1>
        </div>

        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="#about-us" className="hover:text-gray-200">About</Link>
          </li>
          <li>
            <Link to="#contact-us" className="hover:text-gray-200">Contact</Link>
          </li>
        </ul>

        <div className="hidden md:flex space-x-4">
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="bg-white text-red-600 px-4 py-2 rounded-md">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-white text-red-600 px-4 py-2 rounded-md">Login</Link>
              <Link to="/signup" className="bg-white text-red-600 px-4 py-2 rounded-md">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
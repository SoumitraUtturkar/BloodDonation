import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/RaktVahini_Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  const handleNavigation = (sectionId) => {
    setIsOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-red-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo & Brand Name */}
        <div className="flex items-center space-x-3">
          <img
            src={Logo}
            alt="RaktVahini Logo"
            className="h-12 w-12 rounded-full border-2 border-white shadow-md"
          />
          <h1 className="text-2xl font-bold tracking-wide">RaktVahini</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium items-center">
          <li>
            <Link
              to="/"
              className="flex items-center justify-center hover:bg-white hover:text-red-600 px-4 py-2 rounded-md transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("about-us")}
              className="flex items-center justify-center hover:bg-white hover:text-red-600 px-4 py-2 rounded-md transition duration-300"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("contact-us")}
              className="flex items-center justify-center hover:bg-white hover:text-red-600 px-4 py-2 rounded-md transition duration-300"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Login & Signup OR User Info & Logout */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-white font-semibold">Hello, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="w-28 h-10 bg-white text-red-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-red-700 py-4 px-6 space-y-4">
          <button
            onClick={() => handleNavigation("about-us")}
            className="block w-full text-left hover:text-gray-300"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("contact-us")}
            className="block w-full text-left hover:text-gray-300"
          >
            Contact
          </button>

          {user ? (
            <>
              <span className="block w-full text-left text-white font-semibold">
                Hello, {user.name}!
              </span>
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block w-full text-left hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="block w-full text-left hover:text-gray-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;




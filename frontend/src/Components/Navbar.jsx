// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../Components/Button";
// import Cards from "../Components/Card";
// import AboutUs from "../Components/about";
// import ContactUs from "../Components/Contact";

// const Home = () => {
//   const navigate = useNavigate();
//   const [userStatus, setUserStatus] = useState({ isDonor: false, isPatient: false });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const checkUserStatus = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const response = await fetch("http://localhost:3000/api/v2/user-status", {
//           headers: {
//             Authorization: Bearer ${token},
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch user status");

//         const data = await response.json();
//         setUserStatus({ isDonor: data.isDonor, isPatient: data.isPatient });
//       } catch (error) {
//         console.error("Error checking user status:", error);
//       }
//     };

//     checkUserStatus();
//   }, []);

//   const handleDonateBlood = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("Please log in first.");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch("http://localhost:3000/api/v2/check-donor", {
//         headers: {
//           Authorization: Bearer ${token},
//         },
//       });

//       const data = await response.json();
//       if (data.success) {
//         navigate("/live-requests"); // Already a donor, go to live requests
//       } else {
//         navigate("/donate-blood"); // Not a donor, go to registration
//       }
//     } catch (error) {
//       console.error("Error checking donor status:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRequestBlood = () => {
//     navigate(userStatus.isPatient ? "/patient-requests" : "/request-blood");
//   };

  

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8 space-y-16">
      
//       {/* Welcome Section */}
//       <section className="bg-red-50 w-full py-16 flex flex-col items-center text-center rounded-lg shadow-lg">
//         <h1 className="text-5xl font-bold text-red-700 mb-6">Welcome to RaktVahini</h1>
//         <p className="text-lg text-gray-700 max-w-2xl">
//           Saving lives one drop at a time. Join us in our mission to ensure that no one suffers due to a lack of blood.
//         </p>
//         <div className="flex justify-center gap-8 mt-8">
//           <Button
//             text="Register as a Blood Bank"
//             color="bg-red-600 hover:bg-red-800 text-white py-4 px-10 rounded-lg text-xl font-semibold transition-all duration-300 w-64 h-16 flex items-center justify-center"
//             link="/register"
//           />
//           <button
//             onClick={handleRequestBlood}
//             className="bg-red-600 hover:bg-red-800 text-white py-4 px-10 rounded-lg text-xl font-semibold transition-all duration-300 w-64 h-16 flex items-center justify-center"
//           >
//             Request Blood
//           </button>
//           <button
//             onClick={handleDonateBlood}
//             disabled={loading}
//             className={`py-4 px-10 rounded-lg text-xl font-semibold transition-all duration-300 w-64 h-16 flex items-center justify-center ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-800 text-white"
//             }`}
//           >
//             {loading ? "Checking..." : "Donate Blood"}
//           </button>
//         </div>
//       </section>

//       {/* Saviours Section */}
//       <section className="w-full max-w-7xl text-center">
//         <h1 className="text-4xl font-bold text-red-700 mb-6">Our Top Saviours</h1>
//         <p className="text-gray-600 max-w-3xl mx-auto">
//           Recognizing our heroes who have generously contributed to saving lives through blood donation.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
//           <Cards />
//           <Cards />
//           <Cards />
//           <Cards />
//           <Cards />
//           <Cards />
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section id="about-us">
//         <AboutUs />
//       </section>

//       {/* Contact Us Section */}
//       <section id="contact-us">
//         <ContactUs />
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/RaktVahini_Logo.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-red-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center">
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="RaktVahini Logo" className="h-12 w-12 rounded-full border-2 border-white" />
          <h1 className="text-3xl font-bold">RaktVahini</h1>
        </div>

        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <button onClick={() => scrollToSection("about-us")} className="hover:text-gray-200">
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection("contact-us")} className="hover:text-gray-200">
              Contact
            </button>
          </li>
        </ul>

        <div className="hidden md:flex space-x-4 text-lg font-semibold items-center">
          {user ? (
            <>
              <span className="text-lg animate-pulse">Welcome, {user.name}</span>
              <button onClick={() => navigate("/profile")} className="bg-white text-red-600 px-4 py-2 rounded-md">
                Profile
              </button>
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
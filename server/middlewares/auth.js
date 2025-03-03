//  const jwt = require("jsonwebtoken");
// require("dotenv").config();

// exports.auth = async (req, res, next) => {
//     try {
//         // Extract token from headers (Best Practice)
//         const token = req.body.token; // Bearer Token

//         if (!token) {
//             return res.status(401).json({ success: false, message: "Token is required" });
//         }

//         try {
//             // Verify token
//             const payload = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = payload; // Attach user data to request
//             next(); // Proceed to next middleware
//         } catch (err) {
//             return res.status(401).json({ success: false, message: "Invalid token" });
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

const jwt = require("jsonwebtoken"); //  Import jwt
const User = require("../models/User");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token; //  Use "token" instead of "jwt"

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectRoute; //  : Export properly







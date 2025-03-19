const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    // Retrieve token from cookies, body, or headers
    const token =
      req.cookies?.token ||
      req.body?.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    // Check if token is missing
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Log to confirm userId from token
      console.log("Decoded User ID:", decoded.id);

      // Check if the user exists
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid token. User not found." });
      }

      // Attach user data to the request
      req.user = user;
      next();
    } catch (error) {
      console.error("Token Verification Error:", error.message);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, message: "Token expired. Please login again." });
      }
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error during authentication" });
  }
};

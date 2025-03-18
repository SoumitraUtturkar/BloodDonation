
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







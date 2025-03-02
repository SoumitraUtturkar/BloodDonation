const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        // Extract token from headers (Best Practice)
        const token = req.body.token; // Bearer Token

        if (!token) {
            return res.status(401).json({ success: false, message: "Token is required" });
        }

        try {
            // Verify token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload; // Attach user data to request
            next(); // Proceed to next middleware
        } catch (err) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Middleware to check if user is a Student
exports.isPatient = async (req, res, next) => {
    try {
        if (req.user.role !== "Patient") {
            return res.status(403).json({ success: false, message: "Access restricted to Patient" });
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Middleware to check if user is an Admin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({ success: false, message: "Access restricted to admin" });
        }
        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

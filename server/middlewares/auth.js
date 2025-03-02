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


const Donor = require("../models/Donor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.registerDonor = async (req, res) => {
    try {
        // Extract user details from authentication
        const { id, name, email, phone } = req.user; 

        // Extract additional donor details from request body
        const { bloodType, location } = req.body;

        // Check if user is already registered as a donor
        const existingDonor = await Donor.findOne({ email });
        if (existingDonor) {
            return res.status(400).json({ error: "User is already registered as a donor" });
        }

        // Create donor profile
        const donor = new Donor({ userId: id, name, email, phone, bloodType, location });
        await donor.save();

        res.status(201).json({ success: true, message: "Donor profile created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

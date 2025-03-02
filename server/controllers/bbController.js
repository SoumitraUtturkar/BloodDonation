const BloodBank = require("../models/BloodBank");

// @desc Create a blood bank
// @route POST /api/bloodbank/post-bank
exports.createBank = async (req, res) => {
    try {
        const { bb_name, email, phone, address } = req.body;

        // Check if all required fields are provided
        if (!bb_name || !email || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new BloodBank instance
        const newBank = new BloodBank({
            bb_name,
            email,
            phone,
            address
        });

        // Save the new BloodBank to the database
        await newBank.save();
        
        // Respond with success message and the created BloodBank object
        res.status(201).json({ message: "Blood bank created successfully", bank: newBank });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Server error", error });
    }
};

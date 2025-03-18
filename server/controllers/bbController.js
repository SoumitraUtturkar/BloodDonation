const BloodBank = require("../models/BloodBank");

// @desc Create a Blood Bank
// @route POST /api/bloodbank/create
// @access Public (can be changed to private if needed)
exports.createBank = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if a blood bank with the same email or phone already exists
        const existingBank = await BloodBank.findOne({ $or: [{ email }, { phone }] });
        if (existingBank) {
            return res.status(400).json({ message: "A Blood Bank with this email or phone already exists" });
        }

        // Create a new Blood Bank instance
        const newBank = new BloodBank({
            name,
            email,
            phone,
            address,
        });

        // Save the new blood bank to the database
        await newBank.save();

        res.status(201).json({ message: "Blood bank created successfully", bank: newBank });
    } catch (error) {
        console.error("Error creating blood bank:", error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                message: "A Blood Bank with this email or phone already exists.",
                field: Object.keys(error.keyPattern)[0], // Identify which field caused the issue
            });
        }

        res.status(500).json({ message: "Server error", error: error.message });
    }
};






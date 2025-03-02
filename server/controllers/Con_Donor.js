const Donor = require("../models/Donor");
const User = require("../models/User");
const Patient = require("../models/Patient");

exports.getAllRequests = async (req, res) => {

    try {
        // Fetch all patient requests
        const requests = await Patient.find().sort({ createdAt: -1 }); // Newest first

        if (requests.length === 0) {
            return res.status(404).json({ success: false, message: "No blood requests found" });
        }

        res.status(200).json({ success: true, requests });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

exports.registerDonor = async (req, res) => {
    try {
        // Extract user ID from auth middleware (req.user is set in auth middleware)
        const userId = req.user.id;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is already a donor
        const existingDonor = await Donor.findOne({ userId });
        if (existingDonor) {
            return res.status(200).json({ 
                success: false, 
                message: "User is already registered as a donor", 
                donor: existingDonor 
            });
        }

        // Extract donor details from request body
        const { bloodType, location, age, phone } = req.body;

        // Create a new donor entry
        const donor = new Donor({
            userId,
            name: user.name,
            email: user.email,
            phone,
            bloodType,
            location,
            age,
        });

        await donor.save();

        res.status(201).json({ success: true, message: "Donor profile created successfully", donor });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};







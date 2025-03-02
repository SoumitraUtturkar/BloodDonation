const BloodRequest = require("../models/Patient");

// @desc Create a blood request
// @route POST /api/patient/post-request
exports.createRequest = async (req, res) => {
    try {
        const { patient_name,guardian_name,email,phone,bloodType,hospital, location,photo} = req.body;

        if (!guardian_name || !phone || !bloodType|| !hospital || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRequest = new BloodRequest({
            patient_name,
            guardian_name,
            email,
            phone,
            bloodType,
            hospital,
            location,         
        });

        await newRequest.save();
        res.status(201).json({ message: "Blood request created successfully", request: newRequest });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

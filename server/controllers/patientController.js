const BloodRequest = require("../models/Patient");

//   Create a Blood Request
exports.createRequest = async (req, res) => {
    try {
        const { patient_name, guardian_name, email, phone, bloodType, hospital, location, photo } = req.body;

        if (!guardian_name || !phone || !bloodType || !hospital || !location) {
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
            photo,
        });

        await newRequest.save();
        res.status(201).json({ message: "Blood request created successfully", request: newRequest });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//   Delete a Blood Request


//   Delete a Blood Request
exports.deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;

        // Find request by ID
        const request = await BloodRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: "Blood request not found" });
        }

        // Ensure only the user who created the request can delete it
        if (request.email !== req.user.email) {
            return res.status(403).json({ message: "You are not authorized to delete this request" });
        }

        await BloodRequest.findByIdAndDelete(id);
        res.status(200).json({ message: "Blood request deleted successfully" });
    } catch (error) {
        console.error("Error deleting blood request:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

//   Update a Blood Request
exports.updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        // Find the existing request
        const request = await BloodRequest.findById(id);
        if (!request) {
            return res.status(404).json({ message: "Blood request not found" });
        }

        // Ensure only the user who created the request can update it
        if (request.email !== req.user.email) {
            return res.status(403).json({ message: "You are not authorized to update this request" });
        }

        // Update only provided fields
        Object.keys(updateFields).forEach((key) => {
            if (updateFields[key] !== undefined) {
                request[key] = updateFields[key];
            }
        });

        await request.save();
        res.status(200).json({ message: "Blood request updated successfully", request });
    } catch (error) {
        console.error("Error updating blood request:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
const Donor = require("../models/Donor");
const User = require("../models/User");
const Patient = require("../models/Patient");

// ✅ Register a Donor
exports.registerDonor = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { bloodType, location, age, phone } = req.body;

        const existingDonor = await Donor.findOne({ userId });
        if (existingDonor) {
            return res.status(400).json({ success: false, message: "User is already registered as a donor" });
        }

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

// ✅ Get All Blood Requests
exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Patient.find().sort({ createdAt: -1 });

        if (requests.length === 0) {
            return res.status(404).json({ success: false, message: "No blood requests found" });
        }

        res.status(200).json({ success: true, requests });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// ✅ Update Donor Details
exports.updateDonor = async (req, res) => {
    try {
      const donorId = req.params.id; // Extract donor ID from params
      const updatedData = req.body; // Extract update data from request body
  
      // Find donor by ID
      const donor = await Donor.findById(donorId);
      if (!donor) {
        return res.status(404).json({
          success: false,
          message: "Donor not found",
        });
      }
  
      // Ensure only the donor can update their profile
      if (donor.userId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to update this donor",
        });
      }
  
      // Update donor profile with new data
      const updatedDonor = await Donor.findByIdAndUpdate(
        donorId,
        updatedData,
        { new: true, runValidators: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Donor profile updated successfully",
        donor: updatedDonor,
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error while updating donor profile",
      });
    }
  };










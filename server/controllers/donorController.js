const mongoose = require("mongoose");
const Donor = require("../models/Donor");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ✅ Create a New Donor and Set Account Type to 'donor'
exports.createDonor = async (req, res) => {
  try {
    const { bloodType, location, contactNumber, age, gender, lastDonationDate, isEligible } = req.body;
    const userId = req.user.id;

    // Check if the user is already registered as a donor
    const existingDonor = await Donor.findOne({ userId });
    if (existingDonor) {
      return res.status(400).json({ success: false, message: "You are already registered as a donor." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Upload photo if available
    let photoUrl = null;
    if (req.files?.photo) {
      const result = await uploadImageToCloudinary(req.files.photo, "donor_photos", 500, 80);
      photoUrl = result.secure_url;
    }

    // Update accountType to 'donor'
    user.accountType = "donor";
    await user.save();

    // Create a new donor
    const newDonor = new Donor({
      userId,
      name: user.name,
      email: user.email,
      bloodType,
      location,
      contactNumber,
      age,
      gender,
      lastDonationDate,
      isEligible,
      photo: photoUrl,
    });

    await newDonor.save();

    res.status(201).json({
      success: true,
      message: "Donor registered successfully and account type updated to 'donor'.",
      donor: newDonor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Donor Details
exports.updateDonor = async (req, res) => {
  try {
    const { bloodType, location, contactNumber, age, gender, lastDonationDate, isEligible } = req.body;
    const userId = req.user.id;

    // Find the donor by userId
    const donor = await Donor.findOne({ userId });
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found." });
    }

    // Upload new photo if available
    if (req.files?.photo) {
      const result = await uploadImageToCloudinary(req.files.photo, "donor_photos", 500, 80);
      donor.photo = result.secure_url;
    }

    // Update donor details
    if (bloodType) donor.bloodType = bloodType;
    if (location) donor.location = location;
    if (contactNumber) donor.contactNumber = contactNumber;
    if (age) donor.age = age;
    if (gender) donor.gender = gender;
    if (lastDonationDate) donor.lastDonationDate = lastDonationDate;
    if (typeof isEligible === "boolean") donor.isEligible = isEligible;

    await donor.save();

    res.status(200).json({
      success: true,
      message: "Donor details updated successfully.",
      donor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Donor Record
exports.deleteDonor = async (req, res) => {
  try {
    const { donorId } = req.params;

    // Validate ID
    if (!donorId || !mongoose.Types.ObjectId.isValid(donorId)) {
      return res.status(400).json({ success: false, message: "Invalid Donor ID." });
    }

    // Find and delete the donor by ID
    const deletedDonor = await Donor.findByIdAndDelete(donorId);

    if (!deletedDonor) {
      return res.status(404).json({ success: false, message: "Donor not found." });
    }

    // Reset the user's accountType to 'user'
    const user = await User.findById(deletedDonor.userId);
    if (user) {
      user.accountType = "user";
      await user.save();
    }

    res.status(200).json({ success: true, message: "Donor deleted successfully and account type reset to 'user'." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Donor Details
exports.getDonorDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the donor by userId
    const donor = await Donor.findOne({ userId });
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found." });
    }

    res.status(200).json({
      success: true,
      donor: {
        ...donor._doc,
        photo: donor.photo || "No photo available",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get All Donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate("userId", "name email");

    if (donors.length === 0) {
      return res.status(404).json({ success: false, message: "No donors found." });
    }

    const formattedDonors = donors.map(donor => ({
      ...donor._doc,
      photo: donor.photo || "No photo available",
    }));

    res.status(200).json({ success: true, donors: formattedDonors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.checkExistingDonor = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if the user is already a registered donor
    const existingDonor = await Donor.findOne({ userId });

    if (existingDonor) {
      return res.status(200).json({
        success: true,
        message: "User is already a registered donor.",
        donor: existingDonor,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User is not registered as a donor.",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



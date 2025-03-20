const User = require("../models/User");
const Patient = require("../models/Patient");
const Donor = require("../models/Donor");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user
    const user = await User.findById(userId)
      .populate({
        path: "previousDonors",
        select: "name bloodType",
      })
      .populate({
        path: "donatedPatients",
        select: "name bloodType",
      });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize profile data
    let profileData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      previousDonors: user.previousDonors,
      donatedPatients: user.donatedPatients,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Retrieve additional details for patients and donors
    if (user.accountType === "patient") {
      const patient = await Patient.findOne({ userId }).select(
        "bloodType gender age location contactNumber hospital urgency status"
      );
      if (patient) {
        profileData = { ...profileData, ...patient._doc };
      }
    } else if (user.accountType === "donor") {
      const donor = await Donor.findOne({ userId }).select(
        "bloodType gender age location contactNumber lastDonationDate isEligible"
      );
      if (donor) {
        profileData = { ...profileData, ...donor._doc };
      }
    }

    res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const User = require("../models/User");
const Patient = require("../models/Patient");
const Donor = require("../models/Donor");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user and populate name, bloodType, and contactNumber for references
    const user = await User.findById(userId)
      .populate("previousDonors", "name bloodType contactNumber")
      .populate("donatedPatients", "name bloodType contactNumber");

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

    // Retrieve patient details if user is a patient
    if (user.accountType === "patient") {
      const patient = await Patient.findOne({ userId });
      if (patient) {
        profileData = {
          ...profileData,
          bloodType: patient.bloodType,
          gender: patient.gender,
          age: patient.age,
          location: patient.location,
          contactNumber: patient.contactNumber,
          hospital: patient.hospital,
          urgency: patient.urgency,
          status: patient.status,
        };
      }
    }

    // Retrieve donor details if user is a donor
    if (user.accountType === "donor") {
      const donor = await Donor.findOne({ userId });
      if (donor) {
        profileData = {
          ...profileData,
          bloodType: donor.bloodType,
          gender: donor.gender,
          age: donor.age,
          location: donor.location,
          contactNumber: donor.contactNumber,
          lastDonationDate: donor.lastDonationDate,
          isEligible: donor.isEligible,
        };
      }
    }

    res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
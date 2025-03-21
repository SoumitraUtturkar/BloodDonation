const User = require("../models/User");
const Patient = require("../models/Patient");
const Donor = require("../models/Donor");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching profile for user:", userId);

    // Fetch the user details with populated references
    const user = await User.findById(userId)
      .populate("previousDonors", "name bloodType contactNumber")
      .populate("donatedPatients", "name bloodType contactNumber");

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log("User found:", user);

    // Fetch Patient & Donor details simultaneously
    const [patient, donor] = await Promise.all([
      Patient.findOne({ userId: user._id }),
      Donor.findOne({ userId: user._id }),
    ]);

    console.log("Patient data:", patient);
    console.log("Donor data:", donor);

    // Merge user, patient, and donor details
    const profileData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      previousDonors: user.previousDonors || [],
      donatedPatients: user.donatedPatients || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      ...(patient && { 
        bloodType: patient.bloodType,
        gender: patient.gender,
        age: patient.age,
        location: patient.location,
        contactNumber: patient.contactNumber,
        hospital: patient.hospital,
        urgency: patient.urgency,
        status: patient.status
      }),
      ...(donor && { 
        bloodType: donor.bloodType,
        gender: donor.gender,
        age: donor.age,
        location: donor.location,
        contactNumber: donor.contactNumber,
        lastDonationDate: donor.lastDonationDate,
        isEligible: donor.isEligible
      })
    };

    res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

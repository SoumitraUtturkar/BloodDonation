const mongoose = require("mongoose");
const Patient = require("../models/Patient");
const User = require("../models/User");

// ✅ Create a New Patient and Set Account Type to 'patient'
exports.createPatient = async (req, res) => {
  try {
    const { bloodType, hospital, location, urgency, contactNumber,age,gender } = req.body;
    const userId = req.user.id;

    // Check if the user is already registered as a patient
    const existingPatient = await Patient.findOne({ userId });
    if (existingPatient) {
      return res.status(400).json({ success: false, message: "You are already registered as a patient." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Update accountType to 'patient'
    user.accountType = "patient";
    await user.save();
     const profileDetails = await Profile.create({
          gender: gender, 
          contactNumber: contactNumber ,
        });

    // Create a new patient
    const newPatient = new Patient({
      userId,
      name:user.name,
      email: user.email,
      bloodType,
      hospital,
      location,
      urgency,
      age,
      contactNumber,
    });

    await newPatient.save();

    res.status(201).json({
      success: true,
      message: "Patient registered successfully and account type updated to 'patient'.",
      patient: newPatient,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Patient Details
exports.updatePatient = async (req, res) => {
  try {
    const { bloodType, hospital, location, urgency, contactNumber, status } = req.body;
    const userId = req.user.id;

    // Find the patient by userId
    const patient = await Patient.findOne({ userId });
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    // Update patient details
    if (bloodType) patient.bloodType = bloodType;
    if (hospital) patient.hospital = hospital;
    if (location) patient.location = location;
    if (urgency) patient.urgency = urgency;
    if (contactNumber) patient.contactNumber = contactNumber;
    if (status) patient.status = status;

    await patient.save();

    res.status(200).json({
      success: true,
      message: "Patient details updated successfully.",
      patient,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Patient Record
exports.deletePatient = async (req, res) => {
    try {
      const { patientId } = req.params;
  
      // Validate ID
      if (!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ success: false, message: "Invalid Patient ID." });
      }
  
      // Find and delete the patient by ID
      const deletedPatient = await Patient.findByIdAndDelete(patientId);
  
      if (!deletedPatient) {
        return res.status(404).json({ success: false, message: "Patient not found." });
      }
  
      // Reset the user's accountType to 'user'
      const user = await User.findById(deletedPatient.userId);
      if (user) {
        user.accountType = "user";
        await user.save();
      }
  
      res.status(200).json({ success: true, message: "Patient deleted successfully and account type reset to 'user'." });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

// ✅ Get Patient Details
exports.getPatientDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the patient by userId
    const patient = await Patient.findOne({ userId }).populate("requests previousDonors");
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    res.status(200).json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

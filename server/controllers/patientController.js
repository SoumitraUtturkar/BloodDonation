const mongoose = require("mongoose");
const Patient = require("../models/Patient");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ✅ Create a New Patient and Set Account Type to 'patient'
exports.createPatient = async (req, res) => {
  try {
    const { bloodType, hospital, location, urgency, contactNumber, age, gender } = req.body;
    const userId = req.user.id;

    // Check if user exists and is not already registered as a patient
    const [user, existingPatient] = await Promise.all([
      User.findById(userId),
      Patient.findOne({ userId }),
    ]);

    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    if (existingPatient) return res.status(400).json({ success: false, message: "You are already registered as a patient." });

    // Upload photo if available
    let photoUrl = null;
    if (req.files?.photo) {
      const result = await uploadImageToCloudinary(req.files.photo, "patient_photos", 500, 80);
      photoUrl = result.secure_url;
    }

    // Update accountType to 'patient'
    user.accountType = "patient";
    await user.save();

    // Create a new patient
    const newPatient = await Patient.create({
      userId,
      name: user.name,
      email: user.email,
      bloodType,
      hospital,
      location,
      urgency,
      age,
      gender,
      contactNumber,
      photo: photoUrl,
    });

    res.status(201).json({ success: true, message: "Patient registered successfully.", patient: newPatient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Patient Details
exports.updatePatient = async (req, res) => {
  try {
    const { bloodType, hospital, location, urgency, contactNumber, status, age, gender } = req.body;
    const userId = req.user.id;

    const patient = await Patient.findOne({ userId });
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found." });

    // Upload new photo if available
    if (req.files?.photo) {
      const result = await uploadImageToCloudinary(req.files.photo, "patient_photos", 500, 80);
      patient.photo = result.secure_url;
    }

    // Update fields if provided
    Object.assign(patient, { bloodType, hospital, location, urgency, contactNumber, status, age, gender });

    await patient.save();
    res.status(200).json({ success: true, message: "Patient details updated successfully.", patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete Patient Record
exports.deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ success: false, message: "Invalid Patient ID." });
    }

    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    if (!deletedPatient) return res.status(404).json({ success: false, message: "Patient not found." });

    // Reset user accountType
    const user = await User.findById(deletedPatient.userId);
    if (user) {
      user.accountType = "user";
      await user.save();
    }

    res.status(200).json({ success: true, message: "Patient deleted and account type reset to 'user'." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Patient Details
exports.getPatientDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const patient = await Patient.findOne({ userId }).populate("requests previousDonors");
    if (!patient) return res.status(404).json({ success: false, message: "Patient not found." });

    res.status(200).json({
      success: true,
      patient: { ...patient._doc, photo: patient.photo || "No photo available" },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// ✅ Get Patient Details
exports.getPatientDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({ _id: id }).populate("requests");

    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    res.status(200).json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

  
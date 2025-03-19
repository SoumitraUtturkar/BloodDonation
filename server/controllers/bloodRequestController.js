const mongoose = require("mongoose");
const BloodRequest = require("../models/bloodRequest");
const Patient = require("../models/Patient");
const Donor = require("../models/Donor");

// ✅ 1. Create a Blood Request
exports.createBloodRequest = async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ success: false, message: "Invalid Patient ID." });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found." });
    }

    const bloodRequest = new BloodRequest({ patientId });
    await bloodRequest.save();

    res.status(201).json({ success: true, message: "Blood request created successfully.", bloodRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2. Accept a Blood Request
exports.acceptBloodRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const donorId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid Request ID." });
    }

    const bloodRequest = await BloodRequest.findById(requestId);
    if (!bloodRequest) {
      return res.status(404).json({ success: false, message: "Blood request not found." });
    }

    if (bloodRequest.status !== "Pending") {
      return res.status(400).json({ success: false, message: "Request is already processed." });
    }

    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found." });
    }

    bloodRequest.donorId = donorId;
    bloodRequest.status = "Accepted";
    await bloodRequest.save();

    res.status(200).json({ success: true, message: "Blood request accepted successfully.", bloodRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 3. Complete a Blood Request
exports.completeBloodRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid Request ID." });
    }

    const bloodRequest = await BloodRequest.findById(requestId);
    if (!bloodRequest || bloodRequest.status !== "Accepted") {
      return res.status(404).json({ success: false, message: "Request not found or not accepted yet." });
    }

    bloodRequest.status = "Completed";
    bloodRequest.completionDate = new Date();
    await bloodRequest.save();

    res.status(200).json({ success: true, message: "Blood request completed successfully.", bloodRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 4. Reject a Blood Request
exports.rejectBloodRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid Request ID." });
    }

    const bloodRequest = await BloodRequest.findById(requestId);
    if (!bloodRequest || bloodRequest.status !== "Pending") {
      return res.status(404).json({ success: false, message: "Request not found or not pending." });
    }

    bloodRequest.status = "Rejected";
    await bloodRequest.save();

    res.status(200).json({ success: true, message: "Blood request rejected.", bloodRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 5. Get All Blood Requests
exports.getAllBloodRequests = async (req, res) => {
  try {
    const bloodRequests = await BloodRequest.find()
      .populate("patientId", "name bloodType location")
      .populate("donorId", "name bloodType location");

    res.status(200).json({ success: true, bloodRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 6. Get Blood Requests by Status
exports.getBloodRequestsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatuses = ["Pending", "Accepted", "Completed", "Rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const bloodRequests = await BloodRequest.find({ status })
      .populate("patientId", "name bloodType location")
      .populate("donorId", "name bloodType location");

    res.status(200).json({ success: true, bloodRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const mongoose = require("mongoose");
const BloodRequest = require("../models/bloodRequest");
const Patient = require("../models/Patient");
const Donor = require("../models/Donor");
const mailSender = require('../utils/mailSender'); // Adjust the path if needed

// ✅ 1. Create a Blood Request
exports.createBloodRequest = async (req, res) => {
    try {
      const { patientId } = req.body;
  
      // Validate patientId
      if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(400).json({ success: false, message: "Invalid Patient ID." });
      }
  
      // Find Patient
      const patient = await Patient.findById(patientId).populate('userId', 'email name');
      if (!patient || !patient.userId?.email) {
        return res.status(404).json({ success: false, message: "Patient not found or missing email." });
      }
  
      // Create Blood Request
      const bloodRequest = new BloodRequest({ patientId });
      await bloodRequest.save();
  
      // ✅ Send Email to Patient
      const emailBody = `
        <h2>Hello ${patient.name},</h2>
        <p>Your blood request has been successfully generated.</p>
        <p>We will notify you once a donor accepts your request.</p>
        <p>Thank you for using RaktVahini. Stay strong!</p>
        <p>Regards, <br> RaktVahini Team</p>
      `;
  
      console.log("📧 Sending Blood Request Confirmation Email...");
      await mailSender(patient.userId.email, "Blood Request Submitted Successfully", emailBody);
      console.log("✅ Email sent to patient.");
  
      // Response to Client
      res.status(201).json({ 
        success: true, 
        message: "Blood request created successfully and email sent to the patient.", 
        bloodRequest 
      });
    } catch (error) {
      console.error("❗ Error creating blood request:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };// ✅ 2. Accept a Blood Request




  

  // ✅ Accept a Blood Request
  exports.acceptBloodRequest = async (req, res) => {
    try {
      const { requestId } = req.params;
      const donorId = req.user.id;
  
      // Validate Request ID
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({ success: false, message: "Invalid Request ID." });
      }
  
      // Find Blood Request
      const bloodRequest = await BloodRequest.findById(requestId).populate('patientId');
      if (!bloodRequest) {
        return res.status(404).json({ success: false, message: "Blood request not found." });
      }
  
      if (bloodRequest.status !== "Pending") {
        return res.status(400).json({ success: false, message: "Request is already processed." });
      }
  
      // Find Donor
      const donor = await Donor.findOne({ userId: donorId }).populate('userId', 'email name');
      if (!donor || !donor.userId?.email) {
        return res.status(404).json({ success: false, message: "Donor not found or missing email." });
      }
  
      // Find Patient
      const patient = await Patient.findById(bloodRequest.patientId).populate('userId', 'email name');
      if (!patient || !patient.userId?.email) {
        return res.status(404).json({ success: false, message: "Patient not found or missing email." });
      }
  
      // Update Blood Request
      bloodRequest.donorId = donorId;
      bloodRequest.status = "Accepted";
      await bloodRequest.save();
  
      // ✅ Email to Donor
      const donorEmailBody = `
        <h2>Hello ${donor.name},</h2>
        <p>You have successfully accepted a blood request. Here are the patient details:</p>
        <ul>
          <li><strong>Patient Name:</strong> ${patient.name}</li>
          <li><strong>Blood Type:</strong> ${patient.bloodType}</li>
          <li><strong>Hospital:</strong> ${patient.hospital}</li>
          <li><strong>Location:</strong> ${patient.location}</li>
          <li><strong>Contact:</strong> ${patient.userId.email}, ${patient.phone}</li>
        </ul>
        <p>Thank you for your life-saving act. Please proceed with the donation as soon as possible.</p>
        <p>Regards, <br> RaktVahini Team</p>
      `;
  
      // ✅ Email to Patient
      const patientEmailBody = `
        <h2>Hello ${patient.name},</h2>
        <p>Your blood request has been accepted by a donor. Here are the donor details:</p>
        <ul>
          <li><strong>Donor Name:</strong> ${donor.name}</li>
          <li><strong>Blood Type:</strong> ${donor.bloodType}</li>
          <li><strong>Location:</strong> ${donor.location}</li>
          <li><strong>Contact:</strong> ${donor.userId.email}, ${donor.contactNumber}</li>
        </ul>
        <p>The donor will contact you soon. Stay healthy and stay strong!</p>
        <p>Regards, <br> RaktVahini Team</p>
      `;
  
      // Send Emails to Donor and Patient
      console.log("📧 Sending Emails to Donor and Patient...");
      await Promise.all([
        mailSender(donor.userId.email, "Blood Request Accepted - Patient Details", donorEmailBody),
        mailSender(patient.userId.email, "Your Blood Request has been Accepted!", patientEmailBody)
      ]);
  
      console.log("✅ Emails sent successfully.");
      res.status(200).json({ success: true, message: "Blood request accepted successfully. Emails sent." });
  
    } catch (error) {
      console.error("❗ Error accepting blood request:", error);
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
  
      // ✅ Update Patient's previousDonors list
      const donor = await Donor.findOne({ userId: bloodRequest.donorId });
      if (donor) {
        await Patient.findByIdAndUpdate(
          bloodRequest.patientId,
          { $addToSet: { previousDonors: bloodRequest.donorId } }
        );
        // console.log(patientId.previousDonors[0])
      }
  
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
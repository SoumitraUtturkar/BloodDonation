const mongoose = require("mongoose");
const BloodRequest = require("../models/bloodRequest");
const User = require("../models/User");
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
  const isBloodTypeCompatible = (donorBloodType, patientBloodType) => {
    const compatibility = {
      "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      "O+": ["O+", "A+", "B+", "AB+"],
      "A-": ["A-", "A+", "AB-", "AB+"],
      "A+": ["A+", "AB+"],
      "B-": ["B-", "B+", "AB-", "AB+"],
      "B+": ["B+", "AB+"],
      "AB-": ["AB-", "AB+"],
      "AB+": ["AB+"],
    };
  
    return compatibility[donorBloodType]?.includes(patientBloodType) || false;
  };
  
  
  exports.acceptBloodRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id; // Authenticated user's ID

    // Find the donor using userId
    const donor = await Donor.findOne({ userId });
    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found." });
    }

    const donorId = donor._id;

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

    // Find Patient
    const patient = await Patient.findById(bloodRequest.patientId).populate('userId', 'email name');
    if (!patient || !patient.userId?.email) {
      return res.status(404).json({ success: false, message: "Patient not found or missing email." });
    }

    // ✅ Blood Compatibility Check
    if (!isBloodTypeCompatible(donor.bloodType, patient.bloodType)) {
      return res.status(400).json({ 
        success: false, 
        message:` Blood type mismatch. Donor blood type (${donor.bloodType}) is not compatible with the patient's blood type (${patient.bloodType}).`
      });
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

    console.log("🔎 Received request to complete blood request with ID:", requestId);

    // Validate the request ID
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      console.log("❗ Invalid Request ID.");
      return res.status(400).json({ success: false, message: "Invalid Request ID." });
    }

    // Find the blood request and populate patient and donor details
    const bloodRequest = await BloodRequest.findById(requestId)
      .populate("patientId")
      .populate("donorId")
      .exec();

    if (!bloodRequest) {
      console.log("❗ Blood request not found.");
      return res.status(404).json({ success: false, message: "Blood request not found." });
    }

    if (bloodRequest.status !== "Accepted") {
      console.log("⚠ Blood request not accepted yet. Current status:", bloodRequest.status);
      return res.status(400).json({ success: false, message: "Request not accepted yet." });
    }

    // Extract patient and donor data
    const patient = bloodRequest.patientId;
    const donor = bloodRequest.donorId;

    console.log("✅ Blood request found. Patient:", patient?.name, "Donor:", donor?.name);

    

    // Ensure userId exists for both
    if (!patient.userId || !donor.userId) {
      console.log("❗ Missing userId. Patient UserId:", patient?.userId, "Donor UserId:", donor?.userId);
      return res.status(404).json({ success: false, message: "User ID missing in donor or patient." });
    }

    // Mark the request as completed
    bloodRequest.status = "Completed";
    bloodRequest.completionDate = new Date();
    await bloodRequest.save();
    console.log("✅ Blood request marked as Completed.");

    // Update patient's previous donors list
    const updatedPatient = await User.findByIdAndUpdate(
      patient.userId,
      { $addToSet: { previousDonors: donor.userId } },
      { new: true }
    );
    console.log("✅ Updated Patient's previousDonors:", updatedPatient.previousDonors);

    // Update donor's donated patients list
    const updatedDonor = await User.findByIdAndUpdate(
      donor.userId,
      { $addToSet: { donatedPatients: patient.userId } },
      { new: true }
    );
    console.log("✅ Updated Donor's donatedPatients:", updatedDonor.donatedPatients);

    res.status(200).json({ success: true, message: "Blood request completed successfully.", bloodRequest });

  } catch (error) {
    console.error("❗ Error completing blood request:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


  
// ✅ 4. Reject a Blood Request


exports.rejectBloodRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid Request ID." });
    }

    // Find the Blood Request
    const bloodRequest = await BloodRequest.findById(requestId).populate("patientId");
    if (!bloodRequest) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    // Find the Patient and check for email
    const patient = await Patient.findById(bloodRequest.patientId).populate("userId", "email name");
    if (!patient || !patient.userId?.email) {
      return res.status(404).json({ success: false, message: "Patient not found or missing email." });
    }

    // ✅ Set Status to Pending and Clear DonorId
    bloodRequest.status = "Pending";
    bloodRequest.donorId = null; // Set donorId to null
    await bloodRequest.save();

    // ✅ Send Email to Patient
    const emailBody = `
      <h2>Hello ${patient.name},</h2>
      <p>Unfortunately, your recent blood request was not accepted and has been reverted to 'Pending' status.</p>
      <p>The donor information has been cleared, and we will notify you once a new donor accepts your request.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Thank you for using RaktVahini.</p>
      <p>Regards, <br> RaktVahini Team</p>
    `;

    console.log("📧 Sending Blood Request Status Update Email...");
    await mailSender(patient.userId.email, "Blood Request Status Update: Pending", emailBody);
    console.log("✅ Email sent to patient.");

    // Response to Client
    res.status(200).json({ 
      success: true, 
      message: "Blood request status reverted to Pending, donor cleared, and email sent to the patient.", 
      bloodRequest 
    });

  } catch (error) {
    console.error("❗ Error updating blood request:", error);
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
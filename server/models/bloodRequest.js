const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donor",
    default: null,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Completed", "Rejected"],
    default: "Pending",
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date,
  },
}, { timestamps: true });

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);

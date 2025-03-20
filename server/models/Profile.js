const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic details from User Schema
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    accountType: {
      type: String,
      enum: ["user", "admin", "patient", "donor"],
      required: true,
    },

    // Patient or Donor Reference
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
    },

    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema); 
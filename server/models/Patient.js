const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
      },
    bloodType: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"], // ✅ Restrict to specific options
      },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
      },
    hospital: {
      type: String,
      required: true,
    },
    age: { 
        type: Number, 
        required: true, 
        min: 18, // Ensures donor is at least 18 years old
        max: 65  // Optional: Upper age limit for donation eligibility
      },
    location: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },
   
    photo: { type: String }, 
    contactNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Contact number must be a valid 10-digit number.",
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Matched", "Completed"],
      default: "Pending",
    },
   
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
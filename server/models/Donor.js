const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    }, // Linked to User model

    name: { 
      type: String, 
      required: true, 
      trim: true 
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

    contactNumber: { 
      type: String, 
      required: true, 
      unique: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Phone number must be a valid 10-digit number.",
      },
    },

    age: { 
      type: Number, 
      required: true, 
      min: 18, // Ensures donor is at least 18 years old
      max: 65  // Optional: Upper age limit for donation eligibility
    },

    bloodType: { 
      type: String, 
      required: true, 
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] 
    },
    photo: { type: String }, 

    location: { 
      type: String, 
      required: true 
    },

    lastDonationDate: { 
      type: Date, 
      default: null 
    },

    isEligible: { 
      type: Boolean, 
      default: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);
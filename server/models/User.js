const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Name field with consistent naming and trimming
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // Email field with validation, trimming, and uniqueness
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address.",
      },
    },

    // Password field
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    // Role field with lowercase values for consistency
    accountType: {
      type: String,
      enum: ["user","admin", "patient", "donor"],
      default:"user"
      
    },
    // requests: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "BloodRequest",
    //   },
    // ],
   
    previousDonors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    donatedPatients: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],

    // Token for authentication with optional expiration (if needed)
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export the schema using PascalCase for model name
module.exports = mongoose.model("User", userSchema);
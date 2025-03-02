const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    age:{ type: Number, required: true},
    bloodType: { 
      type: String, 
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
     },
    location: { type: String, required: true },
    // availability: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Donor", donorSchema);
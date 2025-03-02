const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_no: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 65 }, //blood donation sathi age limit aste!
  blood_grp: { 
    type: String, 
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] // Valid blood groups evdhech aahet
  },
  diabetic: { type: Boolean, required: true },
  recent_diseases: { type: [String], default: [] }, // Array of diseases
  last_donation: { type: Date } // Store as Date for filtering
});

const Donor = mongoose.model('Donor', donorSchema);

module.exports = Donor;

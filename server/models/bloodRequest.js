const bloodRequestSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bloodTypeRequired: { 
      type: String, 
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
      required: true 
    },
    hospital: { type: String, required: true },
    location: { type: String, required: true },
    urgency: { type: String, enum: ["Low", "Medium", "High"], required: true },
    contactNumber: { 
      type: String, 
      required: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: "Contact number must be a valid 10-digit number."
      }
    },
    status: { type: String, enum: ["Pending", "Matched", "Completed"], default: "Pending" },
    donors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
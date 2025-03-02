const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    patientID: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true }, // Link to User model
    patient_name: { type: String, required: true },
    relation: { type: String, required: true },
    guardian_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    bloodType: { 
        type: String, 
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    hospital : {type:String, required: true},
    location: { type: String, required: true },
    photo : String
},{ timestamps: true });

module.export = mongoose.model("Patient", patientSchema) 
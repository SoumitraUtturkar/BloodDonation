const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true,trim: true },
    
    email: { type: String, required: true, unique: true,trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Patient','BloodBank'], required:true, trim: true },
   
   

})

module.exports = mongoose.model('User', userSchema);
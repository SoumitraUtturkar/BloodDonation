// const mongoose = require("mongoose");

// const bbSchema = new mongoose.Schema({
//     bb_name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { 
//         type: String, 
//         required: true, 
//         validate: {
//             validator: function(v) {
//                 return /\d{10}/.test(v);  // Example: validating a 10-digit phone number
//             },
//             message: props => `${props.value} is not a valid phone number!`
//         }
//     },
//     address: {type: String, required : true}
// }, { timestamps: true });

// module.exports = mongoose.model("BloodBank", bbSchema);

const mongoose = require("mongoose");

const bbSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);  // Ensuring a 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("BloodBank", bbSchema);


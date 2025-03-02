const Donor = require("../models/Donor");
const User = require("../models/User");

exports.registerDonor = async (req, res) => {
    try {
        // 1️⃣ Extract user ID from auth middleware (req.user is set in auth middleware)
        const userId = req.user.id;  // ✅ Corrected `req.user.userId` → `req.user.id`

        // 2️⃣ Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 3️⃣ Extract donor details from request body
        const { bloodType, location, age, phone } = req.body;

        // 4️⃣ Check if user is already a donor
        const existingDonor = await Donor.findOne({ userId });
        if (existingDonor) {
            return res.status(400).json({ success: false, message: "User is already registered as a donor" });
        }

        // 5️⃣ Create a new donor entry (Extract `name` & `email` from logged-in user)
        const donor = new Donor({
            userId,
            name: user.name,  // ✅ Extracted from logged-in user
            email: user.email, // ✅ Extracted from logged-in user
            phone,
            bloodType,
            location,
            age,
        });

        await donor.save();

        res.status(201).json({ success: true, message: "Donor profile created successfully", donor });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

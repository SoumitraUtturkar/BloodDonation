const User = require("../models/USer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// SignUp
exports.signup = async (req, res) => {
    try {
        const { name, email, password,confirmPassword} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: "Email already exists" });
        
        // Check if passwords match
        if (password!== confirmPassword)
            return res.status(400).json({ error: "Passwords do not match" });


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, password: hashedPassword });
        const newUser = await user.save();

        res.status(201).json({
            success: true,
            data: newUser,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Enter email and password",
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid Email or Password" });

        // Create JWT payload
        const payload = { email: user.email, id: user._id };

        // Generate token with expiration
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
       user = user.toObject();
        user.token = token;
        user.password = undefined;

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            token,
            user,
            message: "User logged in successfully",
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "User logged out successfully" });
};
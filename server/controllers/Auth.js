const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
require("dotenv").config();

// Signup Controller (Register Users Without OTP)
exports.signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
    } = req.body;

    // Validate Input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists. Please login." });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User Profile
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      
      contactNumber: contactNumber || null,
    });

    // Create User
    const user = await User.create({
      name,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
    });

    res.status(201).json({ success: true, user, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error during signup. Please try again." });
  }
};

// Login Controller
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
      }
  
      // Find user without populating additionalDetails
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found. Please sign up first." });
      }
  
      // Compare Password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Incorrect password" });
      }
  
      // Generate JWT Token
      const token = jwt.sign({ id: user._id, role: user.accountType }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
  
      user.token = token;
      user.password = undefined;
  
      // Set Token in Cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login successful",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error during login. Please try again." });
    }
  };
  

// Change Password Controller

exports.updateRole = async (req, res) => {
    try {
      const { accountType } = req.body;
      const userId = req.user.id;
  
      if (!["donor", "patient"].includes(accountType)) {
        return res.status(400).json({ success: false, message: "Invalid account type. Choose 'donor' or 'patient'." });
      }
  
      // Find and update the user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { accountType },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      res.status(200).json({
        success: true,
        message: `Account type updated to ${accountType}`,
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
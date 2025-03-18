const express = require("express");
const router = express.Router();
const { createBank } = require("../controllers/bbController");
const protectRoute = require("../middlewares/auth"); // Import authentication middleware

// Routes
router.post("/post-bank", protectRoute, createBank); // Only authenticated users can add banks


module.exports = router;


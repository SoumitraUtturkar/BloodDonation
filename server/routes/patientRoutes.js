const express = require("express");
const { createRequest } = require("../controllers/patientController");
const protectRoute = require("../middlewares/auth"); // ✅ Fix: Proper import
const router = express.Router();

// Route: Patient posts a blood request
router.post("/post", protectRoute, createRequest); // ✅ Fix: Use protectRoute correctly

module.exports = router;



const express = require("express");
const { registerDonor } = require("../controllers/Con_Donor");
const protectRoute = require("../middlewares/auth"); // ✅ Fix: Proper import


const router = express.Router();

router.post("/register", protectRoute, registerDonor); // ✅ Apply auth middleware

module.exports = router;
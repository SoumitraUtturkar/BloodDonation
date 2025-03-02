const express = require("express");
const { registerDonor ,getAllRequests,donateBlood} = require("../controllers/Con_Donor");
const protectRoute = require("../middlewares/auth"); // ✅ Fix: Proper import


const router = express.Router();

router.post("/register", protectRoute, registerDonor); // ✅ Apply auth middleware
router.get("/requests", protectRoute, getAllRequests);
router.post("/donate/patientId", protectRoute, donateBlood);

module.exports = router;
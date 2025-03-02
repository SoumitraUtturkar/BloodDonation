const express = require("express");
const { registerDonor ,getAllRequests,updateDonor} = require("../controllers/Con_Donor");
const protectRoute = require("../middlewares/auth"); // ✅ Fix: Proper import


const router = express.Router();

router.post("/register", protectRoute, registerDonor); // ✅ Apply auth middleware
router.get("/requests", protectRoute, getAllRequests);

router.put("/update/:id", protectRoute, updateDonor); // ✅ Apply auth middleware

module.exports = router;
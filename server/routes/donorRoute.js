const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const {
  createDonor,
  updateDonor,
  deleteDonor,
  getDonorDetails,
} = require("../controllers/donorController");

// ✅ Create a new donor and set accountType to 'donor'
router.post("/create", auth, createDonor);

// ✅ Update donor details
router.put("/update", auth, updateDonor);

// ✅ Delete donor record
router.delete("/delete/:donorId", auth, deleteDonor);

// ✅ Get donor details
router.get("/details", auth, getDonorDetails);

module.exports = router;

const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const {
  createPatient,
  updatePatient,
  deletePatient,
  getPatientDetails,
} = require("../controllers/patientController");

// ✅ Create a new patient and set accountType to 'patient'
router.post("/create", auth, createPatient);

// ✅ Update patient details
router.put("/update", auth, updatePatient);

// ✅ Delete patient record by ID
router.delete("/delete/:patientId", auth, deletePatient);

// ✅ Get patient details
// router.get("/details", auth, getPatientDetails);
router.get("/details/:id", auth, getPatientDetails);


module.exports = router;

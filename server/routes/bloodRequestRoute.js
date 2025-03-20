const express = require("express");
const router = express.Router();
const { auth, adminMiddleware } = require("../middlewares/authMiddleware");
const {
  createBloodRequest,
  acceptBloodRequest,
  completeBloodRequest,
  rejectBloodRequest,
  getAllBloodRequests,
  getBloodRequestsByStatus,
  getBloodRequestDetails
} = require("../controllers/bloodRequestController");

// ✅ Create Blood Request (Patient Only)
router.post("/create", auth, createBloodRequest);

// ✅ Accept Blood Request (Donor Only)
router.put("/accept/:requestId", auth, acceptBloodRequest);

// ✅ Complete Blood Request (Donor Only)
router.put("/complete/:requestId", auth, completeBloodRequest);

// ✅ Reject Blood Request (Donor or Admin)
router.put("/reject/:requestId", auth, rejectBloodRequest);

// ✅ Get All Blood Requests (Admin Only)
router.get("/all", auth,  getAllBloodRequests);

// ✅ Get Blood Requests by Status (Admin Only)
router.get("/status/:status", auth,  getBloodRequestsByStatus);

router.get("/blood-request/:id",auth,getBloodRequestDetails);

module.exports = router;

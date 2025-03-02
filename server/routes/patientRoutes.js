const express = require("express");
const {
    createRequest,
    updateRequest,
    deleteRequest
} = require("../controllers/patientController");
const protectRoute = require("../middlewares/auth"); // ✅ Ensure authentication middleware is correctly imported

const router = express.Router();

// ✅ Route: Patient posts a blood request
router.post("/post", protectRoute, createRequest);

// ✅ Route: Update a blood request (Only request creator can update)
router.put("/update/:id", protectRoute, updateRequest);

// ✅ Route: Delete a blood request (Only request creator can delete)
router.delete("/delete/:id", protectRoute, deleteRequest);

module.exports = router;

const express = require("express");
const { createRequest } = require("../controllers/patientController");

const auth = require("../middlewares/auth");
const router = express.Router();

// Route: Patient posts a blood request
router.post("/post",auth,createRequest);

module.exports = router;

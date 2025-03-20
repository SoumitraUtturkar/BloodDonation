const express = require("express");
const { getProfile } = require("../controllers/profileController");
const { auth} = require("../middlewares/authMiddleware");

const router = express.Router();

// Fetch user profile
router.get("/profile", auth, getProfile);

module.exports = router;
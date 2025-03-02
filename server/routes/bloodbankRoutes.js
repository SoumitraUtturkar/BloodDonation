const express = require("express");
const router = express.Router();
const { createBank } = require("../controllers/bbController");
const protectRoute = require("../middlewares/auth"); // ✅ Fix: Proper import

router.post("/post-bank",protectRoute,createBank);

module.exports = router;

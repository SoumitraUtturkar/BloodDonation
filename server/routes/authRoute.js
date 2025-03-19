const express = require('express');
const { signup, login, updateRole } = require('../controllers/Auth');
const {auth} = require('../middlewares/authMiddleware');

const router = express.Router();

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.put('/update-role', auth, updateRole); // PUT for updating role

module.exports = router;

const express = require('express');
const { register, login } = require('../controllers/authController');
const validateUserInput = require('../validations/userValidation');
const supabase = require('../middleware/authMiddleware'); // Import Supabase client middleware

const router = express.Router();

router.post('/register', validateUserInput, register);
router.post('/login', login);

module.exports = router;

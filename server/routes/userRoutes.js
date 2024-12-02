import express from 'express';
import { signup, login } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

// POST /users/signup - Create a new user
router.post('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('displayName').notEmpty().withMessage('Display Name is required')
], signup); // Use the signup controller function

// POST /users/login - Login user by email
router.post('/login', login); // Use the login controller function

export default router;

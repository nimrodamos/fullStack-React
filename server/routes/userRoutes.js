import express from 'express';
import { signup, login, getUserByDisplayName, getAllUsers } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

// יצירת משתמש חדש (Signup)
router.post('/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], signup);

// כניסת משתמש קיים (Login)
router.post('/login', login);

// מציאת משתמש לפי displayName
router.get('/name/:displayName', getUserByDisplayName);

// הצגת כל המשתמשים
router.get('/', getAllUsers);

export default router;

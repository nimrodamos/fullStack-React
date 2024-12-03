import User from '../models/user.js';
import { validationResult } from 'express-validator';

// יצירת משתמש חדש (Signup)
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // בדיקה אם המשתמש כבר קיים
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // יצירת משתמש חדש
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// כניסת משתמש קיים (Login)
export const login = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // חיפוש משתמש לפי username או email
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // בדיקת התאמת סיסמה
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// מציאת משתמש לפי displayName
export const getUserByDisplayName = async (req, res) => {
    const { displayName } = req.params;

    try {
        const user = await User.findOne({ username: displayName });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// הצגת כל המשתמשים
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

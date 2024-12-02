import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Create a new user (signup)
export const signup = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, displayName } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ email, displayName });
        await user.save();
        res.status(201).json(user); // Return created user
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user by email
export const login = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); // Return user data if found
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

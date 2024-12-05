import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const saltRounds = 10;

// יצירת משתמש חדש (Signup)
export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// כניסת משתמש קיים (Login)
export const login = async (req, res) => {
  console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
  const { email, password } = req.body;

  try {
    // בדוק אם המשתמש קיים
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // בדוק אם הסיסמה נכונה
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // בדוק אם המפתח הסודי מוגדר
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error(
        "JWT_SECRET_KEY is not defined in the environment variables"
      );
    }

    // צור JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET_KEY, // משתמש במפתח הסודי מ-ENV
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Login error:", error.message); // לוג נוסף
    res.status(500).json({ message: error.message });
  }
};

// מציאת משתמש לפי displayName
export const getUserByDisplayName = async (req, res) => {
  const { displayName } = req.params;

  try {
    const user = await User.findOne({ username: displayName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

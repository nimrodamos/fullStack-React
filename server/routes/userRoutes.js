import express from "express";
import {
  signup,
  login,
  getUserByDisplayName,
  getAllUsers,
} from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signup
);

router.post("/login", login);

router.get("/name/:displayName", getUserByDisplayName);

router.get("/", getAllUsers);

export default router;

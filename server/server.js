import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config(); // Load environment variables
console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

// Import route files
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

// Middleware Configuration
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Enable credentials
  })
);

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user; // Attach user to the request
    next();
  });
};

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes setup
app.use("/users", userRoutes);
app.use("/posts", authenticateToken, postRoutes); // Protect post routes
app.use("/comments", authenticateToken, commentRoutes); // Protect comment routes

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

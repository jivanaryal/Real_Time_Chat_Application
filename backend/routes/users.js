import express from "express";
import { body } from "express-validator";
import { login, signup } from "../controllers/users.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();

router.post(
  "/signup",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signup
);

router.post("/login", login);

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default router;

import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import db from "../database/connect.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "jivanaryal";

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db`
      INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword}) 
      RETURNING id,username,email;
    `;
    const user = result[0];
    return res
      .status(200)
      .json({ message: "user registered sucessfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db`
        SELECT * FROM users WHERE email = ${email} 
        `;
    console.log(result, "result");
    const user = result[0];
    console.log(user, "user");
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export { signup, login };

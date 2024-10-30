import jwt from "jsonwebtoken";

const JWT_SECRET = "jivanaryal";

export const authenticateToken = (req, res, next) => {
  console.log("Request Headers:", req.headers); // Log all headers for debugging

  const authHeader = req.headers["authorization"]; // Correctly access the headers
  const token = authHeader && authHeader.split(" ")[1]; // Split on space to get the token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Store the decoded user data
    next(); // Call the next middleware
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

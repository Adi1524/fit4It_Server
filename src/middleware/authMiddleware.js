import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) res.status(401).json({ msg: "not authorized, no token" });
  try {
    console.log("secret:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

import express from "express";
import passport from "passport";
import { login, logout, register } from "../controllers/authController.js";
const router = express.Router();

// local auth
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    if (req.user.age) {
      res.redirect("http://localhost:5173/profile");
    } else {
      res.redirect("http://localhost:5173/complete-profile");
    }
  }
);

export default router;

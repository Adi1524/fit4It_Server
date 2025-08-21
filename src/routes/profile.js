import express from "express";
import { profileSetup } from "../controllers/profileController.js";
const router = express.Router();

router.post("/setup", profileSetup);

export default router;

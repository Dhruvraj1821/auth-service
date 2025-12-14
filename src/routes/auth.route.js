import { Router } from "express";
import {registerUser, loginUser} from "../controllers/auth.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    userId: req.userId,
  });
});

export default router;

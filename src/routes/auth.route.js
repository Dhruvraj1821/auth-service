import { Router } from "express";
import {registerUser, loginUser,logoutUser,refreshAccessToken} from "../controllers/auth.controller.js";
import {protect} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register",registerUser);
router.post("/login", loginUser);
router.post("/refresh",refreshAccessToken);
router.post("/logout",logoutUser);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    userId: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
});

export default router;

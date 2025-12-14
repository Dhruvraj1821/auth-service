import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";
import {
  getAllUsers,
  updateUserRole,
} from "../controllers/admin.controller.js";

const router = Router();

/**
 * Admin-only routes
 */
router.use(protect);
router.use(requireRole(["admin"]));

router.get("/users", getAllUsers);
router.patch("/users/:id/role", updateUserRole);

export default router;

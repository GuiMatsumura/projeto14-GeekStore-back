import { Router } from "express";
import {
  postUsers,
  postSession,
  getUser,
} from "../controllers/authController.js";

const router = Router();

router.post("/users", postUsers);
router.post("/session", postSession);
router.get("/user", getUser);

export default router;

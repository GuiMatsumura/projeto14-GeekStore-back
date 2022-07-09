import { Router } from "express";
import { postUsers, postSession } from "../controllers/authController";

const router = Router();

router.post("/users", postUsers);
router.post("/session", postSession);

export default router;

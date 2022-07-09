import { Router } from "express";
import { postUsers } from "../controllers/authController";

const router = Router();

router.post("/users", postUsers);

export default router;

import { Router } from "express";
import { postUsers, postSession } from "../controllers/authController.js";

const router = Router();

router.post(
  "/users",
  function (req, res, next) {
    res.json({ msg: "This is CORS-enabled for only example.com." });
    next();
  },
  postUsers
);
router.post("/session", postSession);

export default router;

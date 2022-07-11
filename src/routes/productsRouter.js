import { Router } from "express";
import {
  getHardware,
  getPromotion,
  getMonitor,
  getJogos,
  getPerifericos,
  getProduct,
  postCart,
} from "../controllers/productsController.js";

const router = Router();

router.get("/hardware", getHardware);
router.get("/promotion", getPromotion);
router.get("/monitor", getMonitor);
router.get("/jogos", getJogos);
router.get("/perifericos", getPerifericos);
router.post("/product", getProduct);
router.post("/cart", postCart);

export default router;

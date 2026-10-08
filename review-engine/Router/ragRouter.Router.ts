import { Router } from "express";

import { scanningController } from "../Controller/Scanning.controller.js";
import { EmbeddingController } from "../Controller/Embedding.controller.js";

const router = Router();

router.route('/process').post(scanningController);
router.route('/embedding').post(EmbeddingController)

export default router;
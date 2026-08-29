import { Router } from "express";

import {scanningController, } from '../Controller/Scanning.controller.js'
import { EmbeddingController } from '../Controller/Embedding.controller.js';

const router = Router();

router.post("/process", scanningController);
router.post("/embedding", EmbeddingController);

export default router;
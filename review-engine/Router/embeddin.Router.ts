import { Router } from "express";
import { EmbeddingController } from '../Controller/Embedding.controller.js'

const router = Router();

router.route('/embedding').post(EmbeddingController)

export default router
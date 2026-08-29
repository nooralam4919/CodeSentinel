import { Router } from "express";


const router = Router();

router.route('/embedding').post(EmbeddingController)

export default router
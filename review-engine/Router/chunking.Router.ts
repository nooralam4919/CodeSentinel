import { Router } from "express";

const router = Router();

router.route('/process').post(scanningController) // chunking here

export default router;

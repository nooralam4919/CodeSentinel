import { Router } from "express";
import { scanningController } from '../Controller/Scanning.controller.js'
const router = Router();

router.route('/process').post(scanningController) // chunking here

export default router;

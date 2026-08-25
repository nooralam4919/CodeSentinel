import { Router } from "express";
import {scanningRouter} from '../Controller/Scanning.controller.js'
const router = Router();

router.route('/process').post(scanningRouter)

export default router;

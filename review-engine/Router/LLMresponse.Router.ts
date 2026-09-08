import { Router } from "express";
import {llmResponseAns} from "../Controller/LlmResponseAns.controller.js"

const router = Router();

router.route("/forans").post(llmResponseAns);


export default router;
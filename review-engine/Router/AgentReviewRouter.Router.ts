import { Router } from "express";
import {questionEmbeddingController} from "../Controller/Question.Controller.js"

const router = Router();

router.route("/analyze-question").post(questionEmbeddingController);

export default router;
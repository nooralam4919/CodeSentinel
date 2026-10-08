import { Router } from "express";
import { MultiAgentController } from "../Controller/MultiAgent.Controller.js";

const router = Router();

// POST /multiagent/review
// Body: { question: string, context: string }
router.route("/review").post(MultiAgentController);

export default router;

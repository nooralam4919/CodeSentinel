import { Router } from "express";
import { AgentController } from '../Controller/Agent.Controller.js'


const router = Router();

router.route("/query").post(AgentController)


export default router;
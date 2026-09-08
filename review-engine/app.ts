import express from "express";


const app = express();

app.use(express.json({ limit: "10mb" }));


app.get("/", (req, res) => {
    res.json({
        message: "Review Engine is working",
    });
});



import ragRouter from './Router/ragRouter.Router.js';
app.use("/RAG", ragRouter);

import agentRouter from "./Router/Agent.Router.js"
app.use("/agent", agentRouter);

import agentReviewRouter from "./Router/AgentReviewRouter.Router.js"
app.use("/questionchunk", agentReviewRouter);

import llmcallingForHumanMessage from "./Router/LLMresponse.Router.js"
app.use("llmcall", llmcallingForHumanMessage);




export { app };
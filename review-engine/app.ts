import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:5172",
            "http://localhost:5173",
        ],
        credentials: true,
    })
);

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
app.use("/llmcall", llmcallingForHumanMessage);

import multiAgentRouter from "./Router/MultiAgent.Router.js"
app.use("/multiagent", multiAgentRouter);




export { app };
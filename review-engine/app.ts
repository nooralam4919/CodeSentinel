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

import agentRouter from './Router/agent.Router.js'
app.use("/agent", agentRouter);



export { app };
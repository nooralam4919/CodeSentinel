import express from "express";
import ragRouter from './Router/ragRouter.Router.js';

const app = express();

app.use(express.json({ limit: "10mb" }));


app.get("/", (req, res) => {
    res.json({
        message: "Review Engine is working",
    });
});

app.use("/RAG", ragRouter);

export { app };
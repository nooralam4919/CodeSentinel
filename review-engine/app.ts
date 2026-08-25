import express from "express";
import {scanningRouter} from './Controller/Scanning.controller.js';

const app = express();

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
    res.json({
        message: "Review Engine is working"
    });
});

app.use("/process", scanningRouter);

export { app };
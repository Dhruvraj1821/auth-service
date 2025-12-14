import express from "express";

import healthRouter from "./routes/healthRoute.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.use("/health", healthRouter);
app.use("/auth",authRouter);

export default app;

import express from "express";
import cookieParser from "cookie-parser";
import healthRouter from "./routes/healthRoute.js";
import authRouter from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/health", healthRouter);
app.use("/auth",authRouter);
app.use("/admin",adminRoutes);
export default app;

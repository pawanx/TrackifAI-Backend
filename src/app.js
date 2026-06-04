import express from "express";
import cors from "cors";

import applicationRoutes from "./routes/applicationRoutes.js"
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/applications",
  applicationRoutes
);


export default app;
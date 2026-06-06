import express from "express";
import cors from "cors";

import applicationRoutes from "./routes/applicationRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js"

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TrackifAI Backend is running"
  });
});

app.use("/api/auth", authRoutes);
app.use(
  "/api/applications",
  applicationRoutes
);

app.use(
  "/api/interviews",interviewRoutes
)


export default app;
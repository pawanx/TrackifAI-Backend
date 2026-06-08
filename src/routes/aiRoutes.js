import express from "express";

import protect from "../middleware/authMiddleware.js";

import { analyzeResumeMatch,generateInterviewQuestions } from "../controllers/aiController.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "AI route working",
  });
});

router.post("/resume-match", protect, analyzeResumeMatch);

router.post("/interview-questions", protect, generateInterviewQuestions);

export default router;

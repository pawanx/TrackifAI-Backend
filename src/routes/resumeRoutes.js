import express from "express";

import protect from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";



import {
  uploadResume,getResumes
} from "../controllers/resumeController.js";

const router =
  express.Router();

router.post(
  "/",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/",
  protect,
  getResumes
);

export default router;
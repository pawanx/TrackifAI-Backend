import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  getApplicationStats,
  getMonthlyStats,
} from "../controllers/applicationController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getApplications)
  .post(protect, createApplication);


router.get(
  "/stats",
  protect,
  getApplicationStats
);

router.get(
  "/stats/monthly",
  protect,
  getMonthlyStats
);

router
  .route("/:id")
  .get(protect, getApplicationById)
  .put(protect, updateApplication)
  .delete(protect, deleteApplication);

export default router;
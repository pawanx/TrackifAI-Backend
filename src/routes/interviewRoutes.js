import express from "express"
import protect from "../middleware/authMiddleware.js"

import { addInterview,updateInterviewResult,deleteInterview,getUpcomingInterviews } from "../controllers/applicationController.js"

const router = express.Router()

router.post("/:id",protect,addInterview)

router.patch(
  "/:applicationId/:interviewId",
  protect,
  updateInterviewResult
);

router.delete(
  "/:applicationId/:interviewId",
  protect,
  deleteInterview
);

router.get(
  "/upcoming",
  protect,
  getUpcomingInterviews
);

export default router;
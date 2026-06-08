import Activity from "../models/Activity.js";

// @desc Get User Activities
// @route GET /api/activities
// @access Private

export const getActivities = async (
  req,
  res
) => {
  try {
    const activities =
      await Activity.find({
        user: req.user._id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(20);

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
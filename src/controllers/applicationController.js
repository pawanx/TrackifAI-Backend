import Application from "../models/Application.js";

export const getApplications = async (req, res) => {
  try {
    const {
      search,
      status,
      source,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {
      user: req.user._id,
    };

    // Search
    if (search) {
      query.$or = [
        {
          companyName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by source
    if (source) {
      query.source = source;
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort) {
      switch (sort) {
        case "company":
          sortOption = { companyName: 1 };
          break;

        case "role":
          sortOption = { role: 1 };
          break;

        case "oldest":
          sortOption = { createdAt: 1 };
          break;

        case "newest":
          sortOption = { createdAt: -1 };
          break;

        case "status":
          sortOption = { status: 1 };
          break;

        default:
          sortOption = { createdAt: -1 };
      }
    }

    const skip =
      (Number(page) - 1) * Number(limit);

    const total =
      await Application.countDocuments(query);

    const applications =
      await Application.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    res.status(200).json({
      success: true,

      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(
          total / Number(limit)
        ),
        totalRecords: total,
        recordsPerPage: Number(limit),
      },

      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// @desc Get Dashboard Stats
// @route GET /api/applications/stats
// @access Private

export const getApplicationStats = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const stats = await Application.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const result = {
      totalApplications: 0,
      saved: 0,
      applied: 0,
      assessment: 0,
      interview: 0,
      offer: 0,
      rejected: 0,
    };

    stats.forEach((item) => {
      result.totalApplications += item.count;

      switch (item._id) {
        case "Saved":
          result.saved = item.count;
          break;

        case "Applied":
          result.applied = item.count;
          break;

        case "Assessment":
          result.assessment = item.count;
          break;

        case "Interview":
          result.interview = item.count;
          break;

        case "Offer":
          result.offer = item.count;
          break;

        case "Rejected":
          result.rejected = item.count;
          break;
      }
    });

    result.interviewRate =
      result.totalApplications > 0
        ? (
            (result.interview /
              result.totalApplications) *
            100
          ).toFixed(2)
        : 0;

    result.offerRate =
      result.totalApplications > 0
        ? (
            (result.offer /
              result.totalApplications) *
            100
          ).toFixed(2)
        : 0;

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// @desc Monthly Application Trends
// @route GET /api/applications/stats/monthly
// @access Private

export const getMonthlyStats = async (
  req,
  res
) => {
  try {
    const stats = await Application.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: {
            year: {
              $year: "$applicationDate",
            },
            month: {
              $month: "$applicationDate",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getApplicationById = async (
  req,
  res
) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateApplication = async (
  req,
  res
) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const updatedApplication =
      await Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      data: updatedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteApplication = async (
  req,
  res
) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// @desc Get Recent Applications
// @route GET /api/applications/recent
// @access Private

export const getRecentApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await Application.find({
        user: req.user._id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5);

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// PATCH /api/applications/:id/status

export const updateApplicationStatus =
  async (req, res) => {
    try {
      const { status } = req.body;

      const application =
        await Application.findOne({
          _id: req.params.id,
          user: req.user._id,
        });

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      application.status = status;

      await application.save();

      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  export const addInterview = async (
  req,
  res
) => {
  try {
    const application =
      await Application.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found",
      });
    }

    application.interviews.push(
      req.body
    );

    await application.save();

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateInterviewResult =
  async (req, res) => {
    try {
      const { result } = req.body;

      const application =
        await Application.findOne({
          _id: req.params.applicationId,
          user: req.user._id,
        });

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      const interview =
        application.interviews.id(
          req.params.interviewId
        );

      if (!interview) {
        return res.status(404).json({
          success: false,
          message:
            "Interview not found",
        });
      }

      interview.result = result;

      await application.save();

      res.status(200).json({
        success: true,
        data: application,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const deleteInterview =
  async (req, res) => {
    try {
      const application =
        await Application.findOne({
          _id: req.params.applicationId,
          user: req.user._id,
        });

      if (!application) {
        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      const interview =
        application.interviews.id(
          req.params.interviewId
        );

      if (!interview) {
        return res.status(404).json({
          success: false,
          message:
            "Interview not found",
        });
      }

      interview.deleteOne();

      await application.save();

      res.status(200).json({
        success: true,
        message:
          "Interview deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


  export const getUpcomingInterviews =
  async (req, res) => {
    try {
      const today = new Date();

      const applications =
        await Application.find({
          user: req.user._id,
        });

      const interviews = [];

      applications.forEach(
        (application) => {
          application.interviews.forEach(
            (interview) => {
              if (
                interview.interviewDate &&
                new Date(
                  interview.interviewDate
                ) >= today &&
                interview.result !==
                  "Passed" &&
                interview.result !==
                  "Failed"
              ) {
                interviews.push({
                  applicationId:
                    application._id,

                  companyName:
                    application.companyName,

                  role:
                    application.role,

                  round:
                    interview.round,

                  interviewDate:
                    interview.interviewDate,

                  interviewer:
                    interview.interviewer,

                  result:
                    interview.result,
                });
              }
            }
          );
        }
      );

      interviews.sort(
        (a, b) =>
          new Date(
            a.interviewDate
          ) -
          new Date(
            b.interviewDate
          )
      );

      res.status(200).json({
        success: true,
        data: interviews.slice(
          0,
          5
        ),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
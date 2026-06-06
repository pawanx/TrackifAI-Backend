import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
    },

    jobLink: {
      type: String,
      default: "",
    },

    salary: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: [
        "LinkedIn",
        "Naukri",
        "Indeed",
        "Referral",
        "Company Website",
        "Internshala",
        "Other",
      ],
      default: "Other",
    },

    status: {
      type: String,
      enum: [
        "Saved",
        "Applied",
        "Assessment",
        "Interview",
        "Offer",
        "Rejected",
      ],
      default: "Saved",
    },

    notes: {
      type: String,
      default: "",
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    interviews: [
      {
        round: {
          type: String,
          required: true,
        },

        interviewDate: {
          type: Date,
        },

        interviewer: {
          type: String,
          default: "",
        },

        result: {
          type: String,
          enum: ["Scheduled", "Passed", "Failed", "Pending"],
          default: "Scheduled",
        },

        notes: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;

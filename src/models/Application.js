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
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;
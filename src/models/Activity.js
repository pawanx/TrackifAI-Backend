import mongoose from "mongoose";

const activitySchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      type: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      application: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },

      metadata: {
        type: Object,
        default: {},
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Activity",
  activitySchema
);
import Activity from "../models/Activity.js";

const createActivity = async ({
  user,
  type,
  title,
  description = "",
  application = null,
  metadata = {},
}) => {
  try {
    await Activity.create({
      user,
      type,
      title,
      description,
      application,
      metadata,
    });
  } catch (error) {
    console.log(
      "Activity Error:",
      error.message
    );
  }
};

export default createActivity;
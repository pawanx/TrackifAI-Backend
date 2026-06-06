import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";

export const uploadResume =
  async (req, res) => {
    try {

        console.log(req.body);
    console.log(req.file);
      const result =
        await new Promise(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  resource_type:
                    "raw",
                  folder:
                    "trackifai-resumes",
                },
                (
                  error,
                  result
                ) => {
                  if (error)
                    reject(
                      error
                    );
                  else
                    resolve(
                      result
                    );
                }
              )
              .end(
                req.file.buffer
              );
          }
        );

      const resume =
        await Resume.create({
          user: req.user._id,

          title:
            req.body.title,

          resumeUrl:
            result.secure_url,

          cloudinaryId:
            result.public_id,
        });

      res.status(201).json({
        success: true,
        data: resume,
      });
    } catch (error) {
        console.log(error)
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  export const getResumes = async (
  req,
  res
) => {
  try {
    const resumes =
      await Resume.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      data: resumes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
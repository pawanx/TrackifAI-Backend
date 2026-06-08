import genAI from "../config/gemini.js";
import Resume from "../models/Resume.js";
import axios from "axios";
import { extractPdfText } from "../utils/extractPdfText.js";

export const analyzeResumeMatch = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const pdfResponse = await axios.get(resume.resumeUrl, {
      responseType: "arraybuffer",
    });

    const resumeText = await extractPdfText(pdfResponse.data);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Analyze this resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDescription}

IMPORTANT:
You are an API.

Return ONLY a JSON object.

Do not write explanations.
Do not write markdown.
Do not use ** or bullet points.
Do not use \`\`\`json.

{
  "matchScore": number,
  "matchedSkills": [],
  "missingSkills": [],
  "suggestions": []
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();
    console.log("RAW GEMINI RESPONSE:");
    console.log(text);

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    res.status(200).json({
      success: true,
      result: parsed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
Analyze the following Job Description and generate interview questions.

Job Description:
${jobDescription}

Return ONLY JSON:

{
  "technical": [],
  "behavioral": [],
  "systemDesign": [],
  "skillsToStudy": [],
  "importantTopics": []
}
`;

    const result = await model.generateContent(prompt);

    const parsed = JSON.parse(result.response.text());

    res.status(200).json({
      success: true,
      result: parsed,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

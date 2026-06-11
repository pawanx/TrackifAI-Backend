import { Resend } from "resend";
console.log("RESEND_API_KEY =", process.env.RESEND_API_KEY);


const sendEmail = async (email, resetUrl) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
      from: "TrackifAI <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your TrackifAI Password",
      html: `
    <h2>Password Reset Request</h2>
     <p>You requested a password reset.</p>
     <a href="${resetUrl}">
        Reset Password
      </a>
       <p>This link expires in 15 minutes.</p>

    `,
    });
  } catch (error) {
    console.error("Email Error:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;

import dotenv from "dotenv";
dotenv.config();

console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "FOUND" : "NOT FOUND");


import app from "./app.js";
import connectDB from "./config/db.js";



connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});


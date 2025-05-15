import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
export  const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_HOST, // Your email address
    pass: process.env.SMTP_PASSWORD, // Your email password or app password
  },
});


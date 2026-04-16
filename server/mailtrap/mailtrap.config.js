import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. "smtp.gmail.com"
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // SMTP username / email
    pass: process.env.SMTP_PASS, // SMTP password / app password
  },
});

export const sender = {
  email: process.env.SMTP_FROM_EMAIL, // e.g. "youremail@gmail.com"
  name: process.env.SMTP_FROM_NAME || "EMS",
};


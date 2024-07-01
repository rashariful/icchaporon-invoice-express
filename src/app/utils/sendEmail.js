import config from "../config/index.js";
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.email,
        pass: config.app_password,
      },
    });

    await transporter.sendMail({
      from: config.email, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });
  } catch (error) {
    throw new Error("Email sending failed");
  }
};

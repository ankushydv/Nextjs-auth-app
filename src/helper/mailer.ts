import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a toke
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    //Update the value of user table in database as per email type
    if ((emailType = "VERIFY")) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if ((emailType = "FORGET")) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    // creating  transpoter from nodemaile and  sending the mail to user
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    //Format of the email which sent to user email
    const mailOptions = {
      from: "x@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "VERFIY YOUR EMAIL" : "Reset your password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }/verifymail?token=${hashedToken} to ${
        emailType === "VERIFY" ? "VERFIY YOUR EMAIL" : "Reset your password"
      }"</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

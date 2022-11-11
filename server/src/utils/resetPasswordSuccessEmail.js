import config from "../../config/config.js";
import nodemailer from "nodemailer";
import resetPasswordSuccessText from "../lib/resetPasswordSuccessText.js";

const resetPasswordSuccessEmail = async (email, subject) => {
    const text = resetPasswordSuccessText();
    try {
        const transporter = nodemailer.createTransport({
            host: config.HOST,
            service: config.SERVICE,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.EMAIL,
                pass: config.EMAIL_API_KEY
            }
        });

        transporter.sendMail({
            from: config.EMAIL,
            to: email,
            subject: subject,
            html: text
        }, (err) => {
            console.log(err);
        });

        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent");
    }
};

export default resetPasswordSuccessEmail;
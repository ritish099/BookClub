import User from "../models/User.js";
import Book from "../models/Book.js";
import config from "../../config/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import emailText from "../lib/emailText.js";


const signupController = async (req, res, next) => {
    try {
        const { userName, firstName, lastName, email, password, confirmPassword, location } = req.body;
        if (password !== confirmPassword) {
            return res.status(401).json({
                status: false,
                message: "confirm password does not match",
                data: ""
            });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(406).json({
                status: false,
                message: "user already exists with this email",
                data: "",
            });
        }

        const takenUserName = await User.findOne({ userName: userName });
        if (takenUserName) {
            return res.status(406).json({
                status: false,
                message: "username is already taken",
                data: "",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            userName: userName,
            name: `${firstName} ${lastName}`,
            email: email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            location: location,
            postedBooks: []
        });
        
        const payload = {
            email: newUser.email,
            id: newUser._id
        };
        const token = jwt.sign(payload, config.JWT_ACTIVATE, {
            expiresIn: "4h"
        });

        const updateUser = await User.findOneAndUpdate(
            { email: email },
            { verifyEmailToken: token, verifyEmailTokenExpires: Date.now() + 300000 },
            { new: true }
        );
        updateUser.save();
        
        const sender = config.EMAIL;
        const subject = "bookclub verify email";
        const body = "Thank you for signin up in bookclub\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            req.headers.host +
            "\/verify-email\/" +
            newUser.email +
            "\/" + 
            token +
            "\n\n" +
            "If you did not request this, please ignore this email.\n";
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: sender,
                pass: config.EMAIL_API_KEY,
            },
        });

        const mailOptions = {
            from: sender,
            to: email,
            subject: subject,
            text: body,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
        });
    
        return res.status(200).json({
            status: true,
            message: "please verify your email",
            data: {
                name: newUser.name,
                email: newUser.email,
                id: newUser._id,
                token: token
            }
        });

    } catch (err) {
        next(err);
    }
};

export { signupController };
import User from "../models/User.js";
import config from "../../config/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from '../utils/sendEmail.js';
import sendVerifyEmail from '../utils/sendVerifyEmail.js';


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

        const subject = "bookclub email verification";
        const userId = newUser._id;
        const url = "http://" + req.headers.host + "/auth" + "/verify-email/" + userId + "/" + token;
        await sendEmail(email, subject, url);

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

const confirmEmailController = async (req, res, next) => {
    try {
        const verifyEmailToken = req.params.token;
        const verifyUserId = req.params.id;

        if (!verifyEmailToken || !verifyUserId) {
            return res.status(400).json({
                status: false,
                message: "verification link invalid",
                data: ""
            });
        }

        const existingUser = await User.findOne({ _id: verifyUserId, verifyEmailToken: req.params.token });

        if (!existingUser) {
            return res.status(400).json({
                status: false,
                message: "user not found",
                data: ""
            });
        }

        if (existingUser.isVerified) {
            return res.status(400).json({
                status: true,
                message: "user has already verified",
                data: ""
            });
        }

        existingUser.isVerified = true;
        existingUser.verifyEmailTokenExpires = null;
        await existingUser.save();

        const subject = "email account verified";
        await sendVerifyEmail(existingUser.email, subject);

        return res.status(200).json({
            status: true,
            message: "your account has been verified",
            data: ""
        });

    } catch (err) {
        next();
    };
};

export { signupController, confirmEmailController };
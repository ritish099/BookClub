import User from "../models/User.js";
import config from "../../config/config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifiedEmail from "../utils/VerifiedEmail.js";
import verifyEmail from "../utils/verifyEmail.js";
import resetPasswordEmail from "../utils/resetPasswordEmail.js";
import resetPasswordSuccessEmail from "../utils/resetPasswordSuccessEmail.js";

const signupController = async (req, res, next) => {
  try {
    const {userName, name, email, password, location} = req.body;

    const existingUser = await User.findOne({email: email});
    if (existingUser) {
      return res.status(406).json({
        status: false,
        message: "user already exists with this email",
        data: "",
      });
    }

    const takenUserName = await User.findOne({userName: userName});
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
      name: name,
      email: email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      location: location,
      postedBooks: [],
    });

    const payload = {
      email: newUser.email,
      id: newUser._id,
    };
    const token = jwt.sign(payload, config.JWT_ACTIVATE, {
      expiresIn: "4h",
    });

    const updateUser = await User.findOneAndUpdate(
      {email: email},
      {verifyEmailToken: token, verifyEmailTokenExpires: Date.now() + 300000},
      {new: true}
    );
    updateUser.save();

    const subject = "bookclub email verification";
    const userId = newUser._id;
    const url =
      "https://" +
      config.FRONTEND_URL +
      "/auth" +
      "/verify-email/" +
      userId +
      "/" +
      token;

    const newurl = `${
      config.FRONTEND_URL
    }?m=${"request verify"}&id=${userId}&token=${token}`;
    await verifyEmail(email, subject, newurl);

    return res.status(200).json({
      status: true,
      message: "please verify your email",
      data: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        token: token,
      },
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
      return res.status(200).json({
        status: false,
        message: "verification link invalid",
        data: "",
      });
    }

    const existingUser = await User.findOne({
      _id: verifyUserId,
      verifyEmailToken: req.params.token,
    });

    if (!existingUser) {
      return res.status(200).json({
        status: false,
        message: "user not found",
        data: "",
      });
    }

    if (existingUser.isVerified) {
      return res.status(200).json({
        status: true,
        message: "user has already verified",
        data: "",
      });
    }

    if (!existingUser.isVerified) {
      const subject = "email account verified";
      await verifiedEmail(existingUser.email, subject);
    }

    existingUser.isVerified = true;
    existingUser.verifyEmailTokenExpires = "";
    await existingUser.save();

    return res.status(200).json({
      status: true,
      message: "your account has been verified",
      data: "",
    });
  } catch (err) {
    next();
  }
};

const validateUserController = async (req, res, next) => {
  try {
    const newToken = req.body.token;
    const oldUser = await User.findOne({
      verifyEmailToken: newToken,
    });

    const payload = {
      profile: oldUser,
      id: oldUser._id,
    };
    const token = jwt.sign(payload, config.JWT_ACTIVATE, {
      expiresIn: "4h",
    });

    return res.status(200).json({
      status: true,
      message: "user login by verifying email",
      data: {
        profile: {
          name: oldUser.name,
          email: oldUser.email,
          id: oldUser._id,
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const checkValidUserController = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: {$gt: Date.now()},
    });

    if (!foundUser) {
      return res.status(400).json({
        status: false,
        message: "password token invalid",
        data: "",
      });
    }

    return res.status(200).json({
      status: true,
      message: "user token validated successfully",
      data: "",
    });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const alreadyUser = await User.findOne({
      email: email,
    });

    if (!alreadyUser) {
      return res.status(400).json({
        status: false,
        message: "user does not exist",
        data: "",
      });
    }

    const isPasswordIncorrect = await bcrypt.compare(
      password,
      alreadyUser.password
    );
    if (!isPasswordIncorrect) {
      return res.status(406).json({
        status: false,
        message: "invalid password",
        data: "",
      });
    }

    const payload = {
      //profile: alreadyUser,
      id: alreadyUser._id,
    };
    const token = jwt.sign(payload, config.JWT_ACTIVATE, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      status: true,
      message: "successfully logged in",
      data: {
        profile: {
          name: alreadyUser.name,
          email: alreadyUser.email,
          id: alreadyUser._id,
          userName: alreadyUser.userName,
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

const sendResetPasswordEmailController = async (req, res, next) => {
  try {
    const email = req.body.email;

    const oldUser = await User.findOne({
      email: email,
    });

    if (!oldUser) {
      return res.status(400).json({
        status: false,
        message: "user not found",
        data: "",
      });
    }

    const payload = {
      email: email,
    };
    const token = jwt.sign(payload, config.JWT_ACTIVATE, {
      expiresIn: "300000",
    });

    const updatedUser = await User.findOneAndUpdate(
      {email: email},
      {resetPasswordToken: token, resetPasswordExpires: Date.now() + 300000},
      {new: true}
    );
    updatedUser.save();

    const subject = "bookclub password reset";
    const url =
      "http://" + req.headers.host + "/auth" + "/reset-password/" + token;
    await resetPasswordEmail(email, subject, url);

    return res.status(200).json({
      status: true,
      message: "reset password email sent",
      data: "",
    });
  } catch (err) {
    next(err);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const token = req.params.token;
    const foundUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: {$gt: Date.now()},
    });

    if (!foundUser) {
      return res.status(400).json({
        status: false,
        message: "reset password token invalid",
        data: "",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const updateUser = await User.findOneAndUpdate(
      {email: foundUser.email},
      {
        resetPasswordToken: "",
        resetPasswordExpires: "",
        password: hashedPassword,
      },
      {new: true}
    );
    updateUser.save();

    const subject = "password reset successfully";
    await resetPasswordSuccessEmail(updateUser.email, subject);

    return res.status(200).json({
      status: true,
      message: "password reset successfully",
      data: "",
    });
  } catch (err) {
    next(err);
  }
};

const userSignedInValidationController = async (req, res, next) => {
  try {
    const {token} = req.body;
    const tokenContent = await jwt.verify(
      token,
      config.JWT_ACTIVATE,
      (err, decoded) => {
        return decoded;
      }
    );

    const user = await User.findById(tokenContent.id);

    if (!user) {
      res.status(404).json({
        message: "No such user found",
      });
    }

    res.status(200).json({
      message: "User found",
    });
  } catch (err) {
    next();
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    if (!req.userId) {
      res.status(400).json({
        message: "No user found",
      });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(400).json({
        message: "No user found",
      });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      username: user.userName,
      image: user.image,
      about: user.about
    });
  } catch (err) {
    next();
  }
};

const getDetailsFromId = async (req, res, next) => {
  try {
    const id = req.params.userId;
    if (!id) {
      res.status(400).json({
        message: "No user with this id found",
      });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({
        message: "No user found",
      });
      return;
    }

    res.status(200).json({
      name: user.name,
      userName: user.userName,
    });
  } catch (err) {
    next();
  }
};

const updateUserDetails = async (req, res, next) => {
  try{
    console.log(req.body);
    const id = req.params.userId;
    console.log(id);

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {new: true});

    res.status(200).json({
      message: "User updated successfully"
    })
  }catch(err){
    next();
  }
}

export {
  signupController,
  confirmEmailController,
  loginController,
  validateUserController,
  checkValidUserController,
  sendResetPasswordEmailController,
  resetPasswordController,
  userSignedInValidationController,
  getUserDetails,
  getDetailsFromId,
  updateUserDetails,
};

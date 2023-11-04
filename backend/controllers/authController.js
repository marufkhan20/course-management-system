const registerValidation = require("../utils/registerValidation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const loginValidation = require("../utils/loginValidation");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/emailService");
const Profile = require("../models/Profile");
const crypto = require("crypto");

// register controller
const registerController = async (req, res) => {
  const { email, number, password, referralId } = req.body;

  // error validation
  const error = registerValidation({
    email,
    number,
    password,
  });

  // response error massage
  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      error,
    });
  }

  try {
    // check user already existing
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: {
          email: "Email is already exist, Please try to another email!",
        },
      });
    }

    // password hash
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }

        // Create New User
        const newUser = new User({
          email,
          number,
          password: hash,
          referral: referralId && referralId,
        });

        let user = await newUser.save();

        // find referral user for update referral array
        const referralUser = await User.findById(referralId);
        if (referralUser?._id) {
          referralUser.referralUser = [
            newUser?._id,
            ...referralUser.referralUser,
          ];

          await referralUser.save();
        }

        // Create new profile
        const newProfile = new Profile({
          userId: user?._id,
          creditPoints: 00,
        });

        await newProfile.save();

        // update user profile field
        await User.findByIdAndUpdate(user._id, {
          profile: newProfile._id,
        });

        res.status(201).json(user);
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// login controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  // error validation
  const error = loginValidation({
    email,
    password,
  });

  // response error massage
  if (Object.keys(error).length > 0) {
    return res.status(400).json({
      error,
    });
  }

  // check user available
  const user = await User.findOne({ email }).populate("profile");
  console.log(user);

  if (!user) {
    return res.status(400).json({
      error: {
        email: "User not found! Please try again!!",
      },
    });
  }

  // check password correct or incorrect
  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(500).json({
        error: "Server Error Occurred!",
      });
    }

    if (!result) {
      return res.status(400).json({
        error: {
          password: "Email or Password Incorrect!",
        },
      });
    }

    // prepare the user object to generate token
    const userObject = {
      userid: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      number: user.number,
      email: user.email,
      role: user.role || "user",
      profile: user.profile,
    };

    // generate token
    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.status(200).json({
      user: userObject,
      token,
    });
  });
};

// change password controller
const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, password } = req.body;

    if (!userId)
      return res.status(400).json({
        error: "Please Provide a Valid User ID!!",
      });

    const user = await User.findById(userId);

    if (!user)
      return res.status(400).json({
        error: "User Not Found!!",
      });

    // check password correct or incorrect
    bcrypt.compare(
      currentPassword,
      user.password,
      async function (err, result) {
        if (err) {
          return res.status(500).json({
            error: "Server Error Occurred!",
          });
        }

        if (!result) {
          return res.status(400).json({
            error: {
              currentPassword: "Current Password Incorrect!!",
            },
          });
        }

        try {
          // password hash
          const saltRounds = 10;
          bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
              if (err) {
                return res.status(500).json({
                  error: err,
                });
              }

              const updatedUser = await User.findByIdAndUpdate(userId, {
                password: hash,
              });

              res.status(200).json(updatedUser);
            });
          });
        } catch (err) {
          return res.status(500).json({
            error: "Server Error Occurred!!",
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// forgot password controller
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        error: {
          email: "Email is Required!!",
        },
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: {
          email: "User not found!!",
        },
      });
    }

    // generate 4 digit random verify code
    const verifyCode = crypto.randomInt(1000, 9999);

    // send mail with verify code
    sendMail({
      from: process.env.FORGOT_PASSWORD_EMAIL_FROM,
      to: email,
      subject: "Reset Your Account Password.",
      html: require("../services/emailTemplate")(verifyCode),
    });

    // generate token using verify code for saving in client side
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(verifyCode.toString(), salt, async function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: err,
          });
        }

        res.status(200).json({ token: hash });
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// verify code controller
const verifyCodeController = async (req, res) => {
  try {
    const { verifyCode, token } = req.body;

    if (!verifyCode) {
      return res.status(400).json({
        verifyCode: "Verify Code is Required!!",
      });
    }

    // compare verify code in token
    bcrypt.compare(verifyCode, token, function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: "Server Error Occurred!",
        });
      }

      if (!result) {
        return res.status(400).json({
          error: {
            verifyCode: "Verify Code is not match!",
          },
        });
      }

      if (result) {
        res.status(200).json({ success: "Verify is Success." });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

// create new password controller
const creatNewPasswordController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("password", password);

    // generate hash using password
    try {
      // password hash
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          }

          const user = await User.findOneAndUpdate(
            { email },
            { $set: { password: hash } },
            { new: true }
          );

          res.status(200).json(user);
        });
      });
    } catch (err) {
      return res.status(500).json({
        error: "Server Error Occurred!!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred!!",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  changePassword,
  forgotPasswordController,
  verifyCodeController,
  creatNewPasswordController,
};

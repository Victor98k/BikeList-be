const bcrypt = require("bcrypt");

const User = require("../models/user.model");
const { registerErrorHandler } = require("../utils/apiHelpers");
const {
  generateAccessAndRefreshToken,
  verifyRefreshToken,
  generateAccessToken,
} = require("../utils/token");

async function registerUser(req, res) {
  const _user = req.body;
  try {
    const user = await User.create(_user);
    const userObject = user.toObject();
    delete userObject.password;

    const tokens = generateAccessAndRefreshToken(user);

    res.status(201).json({
      user: {
        username: userObject.username,
        fullName: userObject.fullName,
        email: userObject.email,
        admin: userObject.admin,
      },
      tokens,
    });
  } catch (error) {
    const handled = registerErrorHandler(error, res, _user?.email);
    if (handled) return;
    res.status(500).json({
      message: error.message,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordTheSame = await bcrypt.compare(password, user.password);
    if (!isPasswordTheSame) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokens = generateAccessAndRefreshToken(user);
    res.json({
      tokens,
      user: {
        id: user._id,
        username: user.username,
        admin: user.admin,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
}

async function refreshAccessToken(req, res) {}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};

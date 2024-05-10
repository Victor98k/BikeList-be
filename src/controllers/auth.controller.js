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
    res.json({
      tokens,
      user: {
        id: user._id,
        username: user.username,
        admin: user.admin,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

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
    console.log(`User found: ${user ? "Yes" : "No"}`);

    if (!user) {
      console.log(`No user found for email: ${email}`);
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordTheSame = await bcrypt.compare(password, user.password);
    console.log(`Password match: ${isPasswordTheSame}`);
    if (!isPasswordTheSame) {
      console.log(`Invalid credentials for user: ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokens = generateAccessAndRefreshToken(user);
    console.log(`Tokens generated: ${tokens ? "Yes" : "No"}`);
    res.json({
      tokens,
      user: {
        id: user._id,
        username: user.username,
        admin: user.admin,
      },
    });
  } catch (error) {
    console.error(`Login error for user ${email}: ${error.message}`);
    res.status(500).json({
      message: "Authentication failed",
      error: error.message,
    });
  }
}

async function refreshAccessToken(req, res) {
  const { refreshToken } = req.body;

  try {
    const verifiedToken = verifyRefreshToken(refreshToken);
    console.log(verifiedToken);
    const user = await User.findById(verifiedToken?.userId);
    if (!user) {
      throw new Error("User not authorized");
    }
    const newAccessToken = generateAccessToken(user);
    res.json({
      access: newAccessToken,
      refresh: refreshToken,
    });
  } catch (error) {
    console.warn("Error in verifying 'refresh token'", error.message);
    res.status(401).json({
      message: "User not authorized",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};

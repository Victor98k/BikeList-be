const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const accesstoken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return accesstoken;
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return refreshToken;
}

function generateAccessAndRefreshToken(user) {
  return {
    access: generateAccessToken(user),
    refresh: generateRefreshToken(user),
  };
}

function verifyAccessToken(token) {
  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  return verifiedToken;
}

function verifyRefreshToken(token) {
  const verifiedToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  return verifiedToken;
}

module.exports = {
  generateAccessToken,
  generateAccessAndRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

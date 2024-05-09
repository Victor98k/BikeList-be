const { verifyAccessToken } = require("../utils/token");

function authMiddleware(req, res, next) {
  const token = req.header("Authorization") || "";
  const accessToken = token.split(" ")?.[1] || "";

  if (!accessToken) {
    console.log("No access token found");
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  try {
    const verifiedToken = verifyAccessToken(accessToken);
    console.log("Verified Token:", verifiedToken);
    req.userId = verifiedToken.userId;
    return next();
  } catch (error) {
    console.log("Error verifying token:", error);
    res.status(401).json({
      message: "User not authorized",
    });
  }
}

module.exports = { authMiddleware };

const User = require("../models/user.model");

const { userErrorHandler } = require("../utils/apiHelpers");

async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    userErrorHandler(error, res);
  }
}

async function getUser(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Cast to ObjectId");
    }
    res.json(user);
  } catch (error) {
    authorErrorHandler(error, res);
  }
}

async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    userErrorHandler(error, res);
  }
}

module.exports = { getUsers, getUser, getCurrentUser };

const User = require("../models/user.model");
const { createAccessToken } = require("../libs/jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  const { email, password, username, seenMovies } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: passwordHash,
      username,
      seenMovies: seenMovies || [],
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      username: userSaved.username,
      email: userSaved.email,
      seenMovies: userSaved.seenMovies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password, username } = req.body;
  let userFound;

  try {
    if (!email) {
      userFound = await User.findOne({ username });
    }
    if (!username) {
      userFound = await User.findOne({ email });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      email: userFound.email,
      username: userFound.username,
      seenMovies: userFound.seenMovies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(404).json({ message: "User not found" });
  return res.json({
    email: userFound.email,
    username: userFound.username,
    seenMovies: userFound.seenMovies,
  });
};

module.exports = {
  register,
  login,
  logout,
  profile,
};

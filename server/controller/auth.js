const express = require("express");
const router = express.Router();
// import gravatar from ("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const User = require("../model/User");

const register = async (req, res) => {
  const { fname, email, password, title, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ error: { message: "User already exists" } });
    }

    user = new User({
      fname,
      email,
      title,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    const data = {
      id: user.id,
      email: user.email,
      title: user.title,
      role: user.role,
      name: user.fname,
    };
    jwt.sign(
      payload,
      process.env.secretOrKey,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, data });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: { message: "Invalid Credentials" } });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: { message: "Invalid Credentials" } });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    const data = {
      id: user.id,
      email: user.email,
      title: user.title,
      role: user.role,
      name: user.fname,
    };
    jwt.sign(
      payload,
      process.env.secretOrKey,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, data });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(400).json({ error: { message: "Invalid Email" } });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    let user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(400).json({ error: { message: "Invalid User" } });
    }
    const resetPassword = new User({
      _id: user._id,
      fname: user.fname,
      email: user.email,
      title: user.title,
      role: user.role,
      password: password,
    });
    const salt = await bcrypt.genSalt(10);

    resetPassword.password = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(user.id, resetPassword, {
      new: true,
    });
    res.json({ message: "Password Updated Successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { register, login, forgetPassword, loadUser, resetPassword };

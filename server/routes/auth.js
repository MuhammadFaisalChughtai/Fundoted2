const express = require("express");
const router = express.Router();

// const { signin, signup } = require("../controller/user.controller.js");
const auth = require("../middleware/auth");
// router.post("/signin", signin);
// router.post("/signup", signup);
const {
  register,
  login,
  forgetPassword,
  resetPassword,
  loadUser,
} = require("../controller/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
// router.get("load-user");
router.get("/load-user", auth, loadUser);
module.exports = router;

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
  forgetPasswordSettings,
  resetPasswordSettings,
  resetEmailSettings,
  resetEmailNow,
  deleteUser,
} = require("../controller/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
// router.get("load-user");
router.get("/load-user", auth, loadUser);
router.post("/forget-password-settings", auth, forgetPasswordSettings);
router.post("/reset-password-settings", auth, resetPasswordSettings);
router.post("/forget-email", auth, resetEmailSettings);
router.post("/reset-email", auth, resetEmailNow);
router.delete("/deleteUser", auth, deleteUser);
module.exports = router;

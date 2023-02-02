const express = require("express");
const {
  register,
  Login,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const Authenticate = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", Login);
router
  .route("/profile")
  .put(Authenticate, updateUserProfile)
  .get(Authenticate, getUserProfile);
module.exports = router;

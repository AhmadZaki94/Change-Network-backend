const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth.controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/register",
  authenticateUser,
  authorizeRoles("Admin"),
  registerUser
);
router.post("/login", loginUser);

module.exports = router;

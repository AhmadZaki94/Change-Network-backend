const express = require("express");
const { assignManager, getMyTeam } = require("../controllers/user.controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/assign-manager",
  authenticateUser,
  authorizeRoles("Admin"),
  assignManager
);

router.get("/my-team", authenticateUser, authorizeRoles("Manager"), getMyTeam);

module.exports = router;

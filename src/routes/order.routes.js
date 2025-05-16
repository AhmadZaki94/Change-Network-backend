const express = require("express");
const {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  getTeamOrders,
} = require("../controllers/order.controller");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/placeOrder",
  authenticateUser,
  authorizeRoles("Employee"),
  createOrder
);

router.get(
  "/",
  authenticateUser,
  authorizeRoles("Admin", "Manager"),
  getAllOrders
);

router.get(
  "/my-orders",
  authenticateUser,
  authorizeRoles("Employee"),
  getMyOrders
);

router.put(
  "/status/:orderId",
  authenticateUser,
  authorizeRoles("Admin", "Manager"),
  updateOrderStatus
);

router.get("/team", authenticateUser, authorizeRoles("Manager"), getTeamOrders);

module.exports = router;

const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/product.controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", getAllProducts);

router.post(
  "/addProduct",
  authenticateUser,
  authorizeRoles("Admin", "Manager"),
  createProduct
);

router.put(
  "/editProduct/:productId",
  authenticateUser,
  authorizeRoles("Admin", "Manager"),
  updateProduct
);

router.delete(
  "/deleteProduct/:productId",
  authenticateUser,
  authorizeRoles("Admin", "Manager"),
  deleteProduct
);

module.exports = router;

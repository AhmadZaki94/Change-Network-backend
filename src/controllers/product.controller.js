const Product = require("../models/product.model");
const sendResponse = require("../utils/response");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      image,
      createdBy: req.user._id,
    });
    return sendResponse(res, 200, "Product added successfull.", { product });
  } catch (error) {
    return sendResponse(res, 500, "Internal server error", null, error.message);
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, image } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, image },
      { new: true }
    );

    if (!product) return sendResponse(res, 404, "Product not found", null);

    return sendResponse(res, 200, "Product updated", { product });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update product", error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return sendResponse(res, 200, "Successfully get products", { products });
  } catch (error) {
    return sendResponse(res, 500, "Internal server error", null, error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByIdAndDelete(productId);
    if (!product) return sendResponse(res, 404, "Product not found", null);

    return sendResponse(res, 200, "Product deleted", { product });
  } catch (error) {
    return sendResponse(
      res,
      500,
      "Failed to delete product",
      null,
      error.message
    );
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
};

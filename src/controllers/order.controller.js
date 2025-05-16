const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const sendResponse = require("../utils/response");

const createOrder = async (req, res) => {
  try {
    const { customerName, productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) return sendResponse(res, 404, "Product not found", null);

    const order = await Order.create({
      customerName,
      product: product,
      placedBy: req.user._id,
    });

    return sendResponse(res, 201, "Order placed", { order });
  } catch (error) {
    return sendResponse(res, 500, "Error while placing order", error.messasge);
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ placedBy: req.user._id }).populate(
      "product"
    );
    return sendResponse(res, 201, "Orders data", { orders });
  } catch (error) {
    return sendResponse(res, 500, "Error fetching orders", error.messasge);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("product")
      .populate("placedBy", "name email role");

    return sendResponse(res, 201, "All Orders data", { orders });
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders", err });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validStatuses = ["Pending", "Delivered", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return sendResponse(res, 400, "Invalid status", null);
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) return sendResponse(res, 404, "Order not found", null);

    order.orderStatus = status;
    await order.save();

    return sendResponse(res, 201, "Order status updated", { order });
  } catch (error) {
    return sendResponse(res, 500, "Failed to update status", error.message);
  }
};

const getTeamOrders = async (req, res) => {
  try {
    const employees = await User.find({ manager: req.user._id }).select("_id");

    const employeeIds = employees.map((emp) => emp._id);

    const orders = await Order.find({
      placedBy: { $in: employeeIds },
    }).populate("placedBy", "name email");

    return sendResponse(res, 201, "Team orders data", { orders });
  } catch (error) {
    return sendResponse(res, 500, "Failed to fetch team orders", error.message);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getTeamOrders,
};

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
const { generateToken } = require("../utils/auth");

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "Employee",
    });

    const token = generateToken(newUser);

    return sendResponse(res, 201, "User Added", { user: newUser, token });
  } catch (error) {
    res;
    return sendResponse(res, 500, "Registration failed", error.message);
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 400, "Invalid credentials", null);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, 400, "Invalid credentials", null);

    const token = generateToken(user._id, user?.role);
    return sendResponse(res, 200, "Login successfull.", { token });
  } catch (error) {
    return sendResponse(res, 500, "Internal server error", null, error.message);
  }
};

module.exports = { registerUser, loginUser };

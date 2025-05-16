require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const generateToken = (id, type) => {
  const payload = {
    id,
    type,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "3h" });
  return token;
};

module.exports = {
  generateToken,
};

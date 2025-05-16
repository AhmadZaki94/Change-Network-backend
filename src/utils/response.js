// utils/response.js
const sendResponse = (res, statusCode, message, data = null, errors = null) => {
  res.status(statusCode).json({
    message,
    data,
    errors,
  });
};

module.exports = sendResponse;

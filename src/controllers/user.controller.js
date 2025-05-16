const User = require("../models/user.model");
const sendResponse = require("../utils/response");

const assignManager = async (req, res) => {
  const { employeeId, managerId } = req.body;

  try {
    const employee = await User.findById(employeeId);
    const manager = await User.findById(managerId);

    if (!employee || employee.role !== "Employee") {
      return sendResponse(res, 400, "Invalid employee ID", null);
    }

    if (!manager || manager.role !== "Manager") {
      return sendResponse(res, 400, "Invalid manager ID", null);
    }

    employee.manager = managerId;
    await employee.save();

    return sendResponse(res, 201, "Manager assigned successfully", {
      employee,
    });
  } catch (error) {
    return sendResponse(res, 500, "Failed to assign manager", error.message);
  }
};

const getMyTeam = async (req, res) => {
  try {
    const team = await User.find({ manager: req.user._id, role: "Employee" });

    return sendResponse(res, 201, "Teams data", { team });
  } catch (error) {
    return sendResponse(
      res,
      500,
      "Failed to fetch team members",
      error.message
    );
  }
};

module.exports = { assignManager, getMyTeam };

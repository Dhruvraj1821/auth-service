import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id email role createdAt"
    );

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("getAllUsers error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "User role updated successfully",
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error("updateUserRole error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

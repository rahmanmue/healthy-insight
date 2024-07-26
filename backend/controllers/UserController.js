import {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/UserService.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUser();
    res.status(users.status).json(users.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(user.status).json(user.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const user = await updateUser(req.body);
    res.status(user.status).json({ message: user.message });
  } catch (error) {
    if (error.message === "Email already registered") {
      res.status(404).json({ message: "Email sudah terdaftar" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    res.sendStatus(user.status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

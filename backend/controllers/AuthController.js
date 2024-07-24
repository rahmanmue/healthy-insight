import { login, register } from "../services/AuthService.js";

export const loginUser = async (req, res) => {
  try {
    const { accessToken } = await login(req.body);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    if (
      error.message === "User not found" ||
      error.message === "Wrong password"
    ) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(user.status).json(user);
  } catch (error) {
    if (error.message === "Email already registered") {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

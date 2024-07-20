import { login, register } from "../services/AuthService.js";

export const loginUser = async (req, res) => {
  try {
    const { accessToken } = await login(req.body);
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = await register(req.body);
    res.status(user.status).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

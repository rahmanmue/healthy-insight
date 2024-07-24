import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (data) => {
  try {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
    await User.create(data);
    return {
      status: 201,
      message: "Data successfully created",
    };
  } catch (err) {
    if (
      err.name === "SequelizeUniqueConstraintError" &&
      err.errors[0].path === "email"
    ) {
      throw new Error("Email already registered");
    } else {
      throw new Error(err.message || "Something went wrong");
    }
  }
};

export const login = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new Error("Email not found");

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) throw new Error("Wrong password");

    const accessToken = jwt.sign(
      {
        userId: user.id,
        username: data.username,
        email: data.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
      }
    );

    return {
      status: 200,
      accessToken,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

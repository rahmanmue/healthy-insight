import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getAllUser = async () => {
  const user = await User.findAll({
    attributes: ["id", "username", "email", "role"],
  });
  return {
    status: 200,
    data: user,
  };
};

export const getUserById = async (id) => {
  const user = await User.findOne({
    attributes: ["id", "username", "email", "role"],
    where: {
      id,
    },
  });
  return {
    status: 200,
    data: user,
  };
};

export const updateUser = async (data) => {
  const userCheck = await User.findOne({
    where: {
      email: data.email,
    },
  });

  if (userCheck && userCheck.id !== data.id) {
    throw new Error("Email already registered");
  }

  if (data.password) {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);
  }

  await User.update(data, {
    where: {
      id: data.id,
    },
  });
  return {
    status: 200,
    message: "Data successfully updated",
  };
};

export const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
  return {
    status: 204,
    message: "Data successfully deleted",
  };
};

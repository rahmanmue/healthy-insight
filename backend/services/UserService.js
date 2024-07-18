import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getAllUser = async () => {
  const user = await User.findAll();
  return {
    status: 200,
    data: user,
  };
};

export const getUserById = async (id) => {
  const user = await User.findOne({
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

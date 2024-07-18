import Case from "../models/CaseModel.js";
import { getHasilPerhitunganKNN } from "./HitungKNNService.js";
import PerhitunganKNN from "../models/PerhitunganKNNModel.js";

export const getAllCase = async () => {
  const case_data = await Case.findAll();
  return {
    status: 200,
    data: case_data,
  };
};

export const getCaseByNoKasus = async (no_kasus) => {
  const case_data = await Case.findOne({
    where: {
      no_kasus: no_kasus,
    },
  });
  return {
    status: 200,
    data: case_data,
  };
};

export const createCase = async (data) => {
  const { results, final_result_case } = await getHasilPerhitunganKNN(data);
  await Case.bulkCreate(final_result_case);
  const res = await PerhitunganKNN.bulkCreate(results);
  return {
    status: 201,
    data: res[0].kode_case,
    message: "Data successfully created",
  };
};

export const updateCase = async (data) => {
  await Case.update(data, {
    where: {
      id: data.id,
    },
  });
  return {
    status: 200,
    message: "Data successfully updated",
  };
};

export const deleteCase = async (id) => {
  await Case.destroy({
    where: {
      id,
    },
  });
  return {
    status: 204,
    message: "Data successfully deleted",
  };
};

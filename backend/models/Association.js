import BasisPengetahuan from "./BasisPengetahuanModel.js";
import Case from "./CaseModel.js";
import Gejala from "./GejalaModel.js";
import Penyakit from "./PenyakitModel.js";
import Solusi from "./SolusiModel.js";

BasisPengetahuan.belongsToMany(Penyakit, {
  through: "basispengetahuan_penyakit",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

BasisPengetahuan.belongsToMany(Gejala, {
  through: "basispengetahuan_gejala",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Case.belongsToMany(Gejala, {
  through: "case_gejala",
  onDelete: "cascade",
  onUpdate: "cascade",
});

Penyakit.hasMany(Solusi, {
  foreignKey: "id_penyakit",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

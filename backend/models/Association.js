import BasisPengetahuan from "./BasisPengetahuanModel.js";
import Case from "./CaseModel.js";
import Gejala from "./GejalaModel.js";
import Penyakit from "./PenyakitModel.js";
import Solusi from "./SolusiModel.js";

Penyakit.hasMany(BasisPengetahuan, {
  foreignKey: "id_penyakit",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

BasisPengetahuan.belongsTo(Penyakit, {
  foreignKey: "id_penyakit",
});

Gejala.hasMany(BasisPengetahuan, {
  foreignKey: "id_gejala",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

BasisPengetahuan.belongsTo(Gejala, {
  foreignKey: "id_gejala",
});

Gejala.hasMany(Case, {
  foreignKey: "id_gejala",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Case.belongsTo(Gejala, {
  foreignKey: "id_gejala",
});

Penyakit.hasMany(Solusi, {
  foreignKey: "id_penyakit",
  onDelete: "cascade",
  onUpdate: "cascade",
});

Solusi.belongsTo(Penyakit, {
  foreignKey: "id_penyakit",
});

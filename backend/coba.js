const parame = {
  basis_pengetahuan: "P01",
  id_penyakit: 1,
  id_gejala: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

const createJson = (data) => {
  const json = [];
  for (let i = 0; i < data.id_gejala.length; i++) {
    json.push({
      basis_pengetahuan: data.basis_pengetahuan,
      id_penyakit: data.id_penyakit,
      id_gejala: data.id_gejala[i],
    });
  }
  return json;
};

let xy = createJson(parame);

console.log(xy);
[
  { basis_pengetahuan: "P03", id_penyakit: 3, id_gejala: 2 },
  { basis_pengetahuan: "P03", id_penyakit: 3, id_gejala: 3 },
  { basis_pengetahuan: "P03", id_penyakit: 3, id_gejala: 6 },
  { basis_pengetahuan: "P03", id_penyakit: 3, id_gejala: 8 },
  { basis_pengetahuan: "P03", id_penyakit: 3, id_gejala: 14 },
  { basis_pengetahuan: "P03", id_penyakit: 3, id_gejala: 17 },
  { basis_pengetahuan: "P03", id_penyakit: 3, id_gejala: 18 },
];

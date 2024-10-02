import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Local
// const db = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//   }
// );

// Clever Cloud
const db = new Sequelize(process.env.POSTGRESQL_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Bisa diatur true jika menggunakan sertifikat yang authorized
    },
  },
  logging: false,
  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
  retry: {
    match: [/ETIMEDOUT/],
    max: 5,
  },
  connectTimeout: 30000,
});

export default db;

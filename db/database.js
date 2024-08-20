// database.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

// Configuración de Sequelize con pool de conexiones
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    pool: {
      max: 5, // Número máximo de conexiones en el pool
      min: 0, // Número mínimo de conexiones en el pool
      acquire: 30000, // Tiempo máximo en ms que Sequelize intentará obtener una conexión antes de lanzar un error
      idle: 10000, // Tiempo máximo en ms que una conexión puede estar inactiva antes de ser liberada
    },
  }
);

module.exports = sequelize;

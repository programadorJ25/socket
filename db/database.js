const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "u684745967_golfClients",
  "u684745967_golfClients",
  "golfClients1423",
  {
    host: "154.49.241.182",
    dialect: "mysql",
  }
);

module.exports = sequelize;

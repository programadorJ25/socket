const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Station = sequelize.define("Station", {
  plcID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegúrate de que identifier sea único si es necesario
  },
  station: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Station;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const SimStationFilter = sequelize.define("simStationFilter", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  simStationFilter: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = SimStationFilter;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Station = sequelize.define("station", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  station: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = Station;

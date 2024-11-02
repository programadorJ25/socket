const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Station = sequelize.define("station", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  values: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = Station;

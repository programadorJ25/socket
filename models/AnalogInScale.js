const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const AnalogInScale = sequelize.define("analogInScale", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  analogInScale: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = AnalogInScale;

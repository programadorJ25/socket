const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const LowLevel = sequelize.define("lowLevel", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lowLevel: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = LowLevel;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PhaseFailure = sequelize.define("phaseFailure", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phaseFailure: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = PhaseFailure;

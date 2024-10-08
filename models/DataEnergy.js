const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const DataEnergy = sequelize.define("energy", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataEnergy: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = DataEnergy;

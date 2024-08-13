const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PumpLead = sequelize.define("sensorConf", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sensorConf: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = PumpLead;

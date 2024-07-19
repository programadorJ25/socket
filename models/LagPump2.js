const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PumpLead = sequelize.define("sensorConf", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegúrate de que identifier sea único si es necesario
  },
  sensorConf: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = PumpLead;

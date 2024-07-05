const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PumpLead = sequelize.define("Lag_pump1", {
  plcID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegúrate de que identifier sea único si es necesario
  },
  pumpLag1: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = PumpLead;

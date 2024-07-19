const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PumpLead = sequelize.define("pump_state", {
  plcID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegúrate de que identifier sea único si es necesario
  },
  pumpState: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = PumpLead;

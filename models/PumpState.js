const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PumpLead = sequelize.define("pump_state", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pumpState: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = PumpLead;

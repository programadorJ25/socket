const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const PumpLead = sequelize.define("pump_lead", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pumpLead: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = PumpLead;

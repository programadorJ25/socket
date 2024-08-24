const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Alarms = sequelize.define("alarms", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alarms: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Alarms;

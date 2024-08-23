const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const VsdPumpPM = sequelize.define("vsdPumpPM", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vsdPumpPM: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = VsdPumpPM;

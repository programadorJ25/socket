const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const VsdPump1 = sequelize.define("vsdPump1", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vsdPump1: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = VsdPump1;

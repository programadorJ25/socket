const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const SetPoint = sequelize.define("set_Point", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  setPoint: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = SetPoint;

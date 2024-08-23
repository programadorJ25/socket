const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const VFDfailure = sequelize.define("vFDfailure", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vFDfailure: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = VFDfailure;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const LowPressureDis = sequelize.define("lowPressureDis", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lowPressureDis: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = LowPressureDis;

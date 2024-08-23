const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const HighPressureDis = sequelize.define("highPressureDis", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  highPressureDis: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = HighPressureDis;

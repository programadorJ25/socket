const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const FilterStation = sequelize.define("filterStation", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  filterStation: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = FilterStation;

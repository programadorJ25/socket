const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const LakeLevel = sequelize.define("lakeLevel", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lakeLevel: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = LakeLevel;

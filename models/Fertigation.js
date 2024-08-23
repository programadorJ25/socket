const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Fertigation = sequelize.define("fertigation", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fertigation: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Fertigation;

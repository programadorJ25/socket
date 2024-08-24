const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const BombaLider = sequelize.define("bombaLider", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bombaLider: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = BombaLider;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const BombaAux = sequelize.define("bombaAux", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bombaAux: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = BombaAux;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Sintonizacion = sequelize.define("sintonizacion", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sintonizacion: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Sintonizacion;

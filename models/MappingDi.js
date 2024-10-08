const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const MappingDi = sequelize.define("mappingDi", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mappingDi: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = MappingDi;

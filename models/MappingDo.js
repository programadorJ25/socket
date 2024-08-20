const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const MappingDo = sequelize.define("mappingDo", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mappingDo: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = MappingDo;

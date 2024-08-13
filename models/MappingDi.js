const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const MappingDi = sequelize.define("mappingDi", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false, // Asegúrate de que identifier sea único si es necesario
  },
  mappingDi: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  
});

module.exports = MappingDi;

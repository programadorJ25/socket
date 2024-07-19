const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const MappingDi = sequelize.define("mappingDi", {
  plcID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false, // Asegúrate de que identifier sea único si es necesario
  },
  mappingDi: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

module.exports = MappingDi;

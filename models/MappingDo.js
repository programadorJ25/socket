const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const MappingDo = sequelize.define("mappingDo", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false, // Asegúrate de que identifier sea único si es necesario
  },
  mappingDo: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

module.exports = MappingDo;

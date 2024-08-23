const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const VsdPump2 = sequelize.define("vsdPump2", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  vsdPump2: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = VsdPump2;

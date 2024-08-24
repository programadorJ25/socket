const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const BombaPM = sequelize.define("bombaPM", {
  plcId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bombaPM: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = BombaPM;

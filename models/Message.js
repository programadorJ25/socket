const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Message = sequelize.define('Message', {
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mensaje: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

module.exports = Message;

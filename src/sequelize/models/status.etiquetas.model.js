const Sequelize = require("sequelize");
const database = require("../config/config");

const StatusEtiquetas = database.define("status_etiquetas", {
  id_status: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING
  },
});

module.exports = StatusEtiquetas;

// Importação do Sequelize
const Sequelize = require("sequelize");

// Importação da Conexão com o Banco de Dados
const database = require("../config/config");

// Definição do Model Etiquetas
const StatusEtiquetas = require("../models/status.etiquetas.model");

const Etiquetas = database.define('etiquetas', {
  id_etiqueta: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  data: Sequelize.STRING(15),
  id_area: {
    defaultValue: 0,
    type: Sequelize.INTEGER
  },
  semana_colheita: Sequelize.INTEGER,
  etiqueta: Sequelize.STRING(7),
  id_status: {
    defaultValue: 1,
    type: Sequelize.INTEGER
  },
  latitude: Sequelize.DOUBLE,
  longitude: Sequelize.DOUBLE,
  previsao_kg: {
    defaultValue: 0,
    type: Sequelize.INTEGER
  }
});

// Relacionamento entre StatusEtiquetas e Etiquetas
StatusEtiquetas.hasMany(Etiquetas, {
  constraint: true,
  foreignKey: 'id_status'
});

Etiquetas.belongsTo(StatusEtiquetas, {
  constraint: true,
  foreignKey: 'id_status'
});

// Método Personalizado para Buscar o Status como String
Etiquetas.prototype.getStatus = async function () {
  // Busca o StatusEtiquetas com base no id_status
  const status = await StatusEtiquetas.findOne({
    where: { id_status: this.id_status },
    attributes: ['status']  // Apenas retorna o campo 'status' como string
  });

  return status ? status.status : null;  // Retorna o status ou null se não encontrado
};

// Exportação do Model
module.exports = Etiquetas;

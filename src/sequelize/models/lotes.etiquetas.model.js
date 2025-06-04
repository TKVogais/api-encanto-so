// Importação do Sequelize
const Sequelize = require("sequelize");

// Importação da Conexão com o Banco de Dados
const database = require("../config/config");

const Usuarios = require("./usuarios.model");
const Etiquetas = require("./etiquetas.model");

// Definição do Model LotesEtiquetas
const LoteEtiquetas = database.define('lotes_etiquetas', {
  id_lote_etiqueta: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_usuario: Sequelize.INTEGER,
  criacao: Sequelize.STRING(15),
  semana_corte: Sequelize.INTEGER,
  semana_colheita: Sequelize.INTEGER,
  ano_corte: Sequelize.INTEGER,
  ano_colheita: Sequelize.INTEGER,
  etiqueta_inicial: Sequelize.INTEGER,
  etiqueta_final: Sequelize.INTEGER
});

// Relacionamento entre LoteEtiquetas e Usuarios
LoteEtiquetas.belongsTo(Usuarios, {
  constraint: true,
  foreignKey: "id_usuario"
});

// Relacionamento entre LoteEtiquetas e Etiquetas
LoteEtiquetas.hasMany(Etiquetas, {
  constraint: true,
  foreignKey: 'id_lote_etiqueta'
});

// Método Personalizado para Buscar Etiquetas com Status Associado
LoteEtiquetas.prototype.getEtiquetasComStatus = async function () {
  const etiquetas = await Etiquetas.findAll({
    where: { id_lote_etiqueta: LoteEtiquetas.id_lote_etiqueta },
    attributes: ['id_etiqueta', 'etiqueta', 'id_status', 'data']  // Retorna apenas os campos necessários de Etiquetas
  });

  // Para cada etiqueta, buscar o status associado e adicionar como string
  for (const etiqueta of etiquetas) {
    etiqueta.status = await etiqueta.getStatus();  // Chama o método getStatus que agora retorna a string do Status
  }

  return etiquetas;
};

// Exportação da Model
module.exports = LoteEtiquetas;

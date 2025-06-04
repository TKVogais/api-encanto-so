//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

//Definição do Model LotesEtiquetas
const Lotes = require("./lotes.model")

const Areas = database.define('areas', {
    id_area: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING(20),
    hectares: Sequelize.DOUBLE,
    id_lote: Sequelize.INTEGER
})

Areas.belongsTo(Lotes, {
    constraint: true,
    foreignKey: "id_area"
})

module.exports = Areasz

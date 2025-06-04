//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

//Definição do Model LotesEtiquetas

const Lotes = database.define('lotes', {
    id_lote: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING(20),
    hectares: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
    hectares_plant: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
    },
})

module.exports = Lotes
//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

//Definição do Model Usuários

const Permissao = database.define('permissoes', {
    id_permissao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: Sequelize.STRING(70)
})

module.exports = Permissao
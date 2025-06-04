//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

const Pessoa = require("./pessoas.model")

//Definição do Model Usuários

const Usuario = database.define('usuarios', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_pessoa: Sequelize.INTEGER,
    senha: Sequelize.STRING(70),
    usuario: Sequelize.STRING(70),
})

Usuario.belongsTo(Pessoa, {
    constraint: true,
    foreignKey: "id_pessoa" 
})


module.exports = Usuario
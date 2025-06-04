//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

const Usuarios = require("./usuarios.model")
const Permissao = require("./permissoes.model")

const Permissao_Usuario = database.define('permissoes_usuarios', {
    id_permissao_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_permissao: Sequelize.INTEGER,
    id_usuario: Sequelize.INTEGER
})

Permissao_Usuario.belongsTo(Usuarios, {
    constraint: true,
    foreignKey: "id_usuario"
})

Permissao_Usuario.belongsTo(Permissao, {
    constraint: true,
    foreignKey: "id_permissao"
})

module.exports = Permissao_Usuario
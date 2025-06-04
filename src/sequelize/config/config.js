//Configuração das Variáveis de Ambiente.

require('dotenv').config()
//Importação do módulo

const Sequelize = require("sequelize")

const dados_bancos = require("./databases")

let obj = process.env.NODE_DB_MODE

if (!dados_bancos[obj]) {
    obj = "desenvolvimento"
}

//Configuração da Conexão com o banco de dados.

const sequelize = new Sequelize(
    process.env[dados_bancos[obj].db],
    process.env[dados_bancos[obj].user],
    process.env[dados_bancos[obj].pass], {
        dialect: dados_bancos[obj].dialect,
        logging: dados_bancos[obj].logging,
        host: process.env[dados_bancos[obj].host],
        dialectModule: require("mysql2")
    }
)

//Exportação

module.exports = sequelize
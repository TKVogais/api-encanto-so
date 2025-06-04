//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

const Pessoa = require("./pessoas.model")

//Definição do Model Usuários

const DadosBancarios = database.define('dados_bancarios', {
    id_dados_bancarios: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_pessoa: Sequelize.INTEGER,
    pix: {
        type: Sequelize.TEXT,
        defaultValue: ""
    },
    agencia: {
        type: Sequelize.STRING(15),
        defaultValue: ""
    },
    conta: {
        type: Sequelize.STRING(15),
        defaultValue: ""
    },
    banco: {
        type: Sequelize.STRING(30),
        defaultValue: ""
    }
})

DadosBancarios.belongsTo(Pessoa, {
    constraint: true,
    foreignKey: "id_pessoa" 
})


module.exports = DadosBancarios
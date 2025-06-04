//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

//Definição do Model Usuários

const Pessoa = database.define('pessoas', {
    id_pessoa: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(70),
        defaultValue: ""
    },
    cpf_cnpj: {
        type: Sequelize.STRING(25),
        defaultValue: ""
    },
    email: {
        type: Sequelize.STRING(70),
        defaultValue: ""
    },
    data_nascimento: {
        type: Sequelize.STRING(20),
        defaultValue: ""
    },
    telefone: {
        type: Sequelize.STRING(20),
        defaultValue: ""
    },
    endereco: {
        type:
            Sequelize.TEXT,
        defaultValue: ""
    },
    cep: {
        type: Sequelize.STRING(15),
        defaultValue: ""
    },
    bairro: {
        type: Sequelize.STRING(70),
        defaultValue: ""
    },
    estado: {
        type: Sequelize.STRING(7),
        defaultValue: ""
    },
    estado_civil: {
        type: Sequelize.STRING(20),
        defaultValue: "Solteiro(a)"
    }
})

module.exports = Pessoa
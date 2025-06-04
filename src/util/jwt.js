//Configuração das Variáveis de Ambiente.

require('dotenv').config()

//Importação do módulo

const jwt = require('jsonwebtoken');

// Chave para assinatura do token

const SECRET_KEY = process.env.NODE_JWT_KEY

// Função que gera um token e adiciona o id do usuário no payload

const gerarToken = async (idUsuario) => {
    const data = {
        idUsuario: idUsuario
    }
    const params = {
        expiresIn: 40 * 60
    }

    return jwt.sign(data, SECRET_KEY, params)
}

// Função que faz a validação do token informado.

const validarToken = async (token) => {
    return jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return false
        return true
    })
}

const tokenPayload = async (token) => {
    return jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return { error: true, message: "Token inexistente!" }
        } else {
            decoded.error = false
            return decoded
        }
    })
}

// Exportação

module.exports = { gerarToken, validarToken, tokenPayload }
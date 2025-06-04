//Importação do Módulo

const bcrypt = require('bcrypt');

//Função que gera um hash da string informada.

const hash = async (senha) => {
    return bcrypt.hashSync(senha, 10)
}

//Função que compara um string e uma hash informada.

const compare = async (senha, hash) => {
    return bcrypt.compareSync(senha, hash)
}

//Exportação

module.exports = { hash, compare }
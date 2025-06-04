const { hash } = require("../util/hash");

class UsuariosRepositorySequelize {
    // Variáveis restritas à classe para mensagens de erro
    static ERROR_MODEL_REQUIRED = "É necessário fornecer uma model.";

    constructor(model) {
        this.model = model ? model : new Error(this.ERROR_MODEL_REQUIRED);
    }

    static build(model) {
        return model ? new UsuariosRepositorySequelize(model) : new Error(this.ERROR_MODEL_REQUIRED);
    }

    async create(usuario, senha) {

        const { dataValues } = await this.model.create({
            usuario: usuario,
            senha: hash(senha)
        })

        return dataValues
    }

    async findUser(usuario) {
        const { dataValues } = await this.model.findOne({
            usuario: usuario
        })

        return dataValues
    }
}

module.exports = UsuariosRepositorySequelize
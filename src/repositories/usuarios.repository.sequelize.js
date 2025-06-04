const { hash } = require("../util/hash");

class UsuariosRepositorySequelize {
    // Variáveis restritas à classe para mensagens de erro
    static ERROR_MODEL_USUARIOS_REQUIRED = "É necessário fornecer uma model de Usuários";
    static ERROR_MODEL_PERMISSOES_REQUIRED = "É necessário fornecer uma model de Permissões"
    static ERROR_MODEL_PERMISSOES_USUARIOS_REQUIRED = "É necessário uma model de Permissões de Usuários"

    constructor(modelUsuarios, modelPermissoes, modelPermissoesUsuarios) {
        this.modelUsuarios = modelUsuarios ? modelUsuarios : new Error(this.ERROR_MODEL_REQUIRED);
        this.modelPermissoes = modelPermissoes? modelPermissoes: new Error(this.ERROR_MODEL_PERMISSOES_REQUIRED)
        this.modelPermissoesUsuarios = modelPermissoesUsuarios? modelPermissoesUsuarios: new Error(this.ERROR_MODEL_PERMISSOES_USUARIOS_REQUIRED)
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

    async listAllUser(){
        const { dataValues } = await this.model.findAll()
        return dataValues
    }

    async listAllPermittions(){
        const { dataValues } = await this.model.findAll()
        return dataValues
    }
}

module.exports = UsuariosRepositorySequelize
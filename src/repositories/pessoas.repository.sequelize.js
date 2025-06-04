class PessoasRepositorySequelize {
    // Variáveis restritas à classe para mensagens de erro
    static ERROR_MODEL_REQUIRED = "É necessário fornecer uma model.";

    constructor(model) {
        this.model = model ? model : new Error(this.ERROR_MODEL_REQUIRED);
    }

    static build(model) {
        return model ? new PessoasRepositorySequelize(model) : new Error(this.ERROR_MODEL_REQUIRED);
    }

    async create() {

        const { dataValues } = await this.model.create({
            usuario: usuario,
            senha: hash(senha)
        })

        return dataValues
    }

    async findCNPJ(cpf_cnpj) {
        const { dataValues } = this.model.findOne({
            where: {
                nome: cpf_cnpj
            }
        })
        return dataValues
    }

}

module.exports = PessoasRepositorySequelize
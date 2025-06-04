const { compare } = require("../util/hash");
const { gerarToken } = require("../util/jwt");
const TryCatch = require("../util/try.catch")

class UsuariosService {

    static ERROR_REPO = "É necessário fornecer uma model.";

    constructor(repository) {
        this.repository = repository ? repository : new Error(this.ERROR_REPO);
    }

    static build(repository) {
        return repository ? new UsuariosService(repository) : new Error(this.ERROR_REPO)
    }

    async create(usuario, senha) {

        let response

        response = await TryCatch(async () => {
            return await this.repository.findLoteSemanas(semana_corte, semana_colheita)
        })

        if (response.data) {
            return {
                statusRequest: 200,
                statusResonse: 401,
                message: "Já existe um lote de etiquetas com as semanas informadas!",
                data: response.data
            }
        }


        response = await TryCatch(async () => {
            return await this.repository.create(criacao, semana_corte, semana_colheita, etiqueta_inicial, etiqueta_final)
        })

        if (response.error) {
            return {
                statusRequest: 200,
                statusResonse: 404,
                message: "Não foi possível cadastrar o lote de etiquetas!",
                data: response.data
            }
        }


        return {
            statusRequest: 200,
            statusResonse: 200,
            message: "Lote de Etiquetas cadastrado com sucesso!",
            data: response.data
        }

    }

    async authenticate(usuario = "", senha = "") {
        console.log(usuario, senha)

        let [error, data] = [null, null];

        ({ error, data } = await TryCatch(async () => {
            return await this.repository.findUser(usuario)
        }));

        if (error || data == null) {
            return res.json({
                statusRequest: 200,
                statusResonse: 401,
                message: "Falha ao realizar o login!",
                data: data
            });
        }

        const senhaCorreta = await compare(senha, data.senha)

        if (!senhaCorreta) {
            return {
                statusRequest: 200,
                statusResponse: 402,
                message: "Os dados fornecidos estão incorretos!",
                data: ""
            }
        }

        const creationTimestamp = Date.now()
        const expirationTimestamp = creationTimestamp + (40 * 60 * 1000)
        const token = await gerarToken(data.idUsuario);

        return {
            statusRequest: 200,
            statusResponse: 200,
            message: "Login realizado com sucesso",
            data: {
                token: token,
                id_usuario: data.id_usuario,
                creationTimestamp,
                expirationTimestamp
            }
        }
    }

    async inicialData(repository) {
        let [error, data] = [null, null];

        ({ error, data } = await TryCatch(async () => {
            return await repository.findAll()
        }));

        let initial = {
            lotes_etiquetas: error || !data ? [] : data
        }
        return initial
    }
}

module.exports = UsuariosService
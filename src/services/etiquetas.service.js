const TryCatch = require("../util/try.catch")

class EtiquetasService {

    static ERROR_REPO = "É necessário fornecer uma model.";

    constructor(repository) {
        this.repository = repository ? repository : new Error(this.ERROR_REPO);
    }

    static build(repository) {
        return repository ? new EtiquetasService(repository) : new Error(this.ERROR_REPO)
    }

    async create(lote_etiqueta, id_lote_etiqueta) {
        const { etiqueta_inicial, etiqueta_final, criacao, semana_colheita } = lote_etiqueta
        let etiquetas = []

        for (let i = etiqueta_inicial; i <= etiqueta_final; i++) {
            etiquetas.push({
                id_lote_etiqueta,
                etiqueta: String(i).padStart(4, '0'),
                data: criacao,
                semana_colheita: semana_colheita,
                longitude: 0,
                latitude: 0
            })
        }

        const response = await TryCatch(async () => {
            return await this.repository.create(etiquetas)
        })

        if (response.error) {
            return {
                statusRequest: 200,
                statusResponse: 404,
                message: "Não foi possível cadastrar o lote de etiquetas!",
                data: response.data
            }
        }
        return {
            statusRequest: 200,
            statusResponse: 200,
            message: "Lote de Etiquetas cadastrado com sucesso!",
            data: response.data
        }
    }

    async list(id_lote_etiqueta) {
        const response = await TryCatch(async () => {
            return await this.repository.list(id_lote_etiqueta)
        })

        if (response.error) {
            return []
        }
        return response.data
    }
}

module.exports = EtiquetasService
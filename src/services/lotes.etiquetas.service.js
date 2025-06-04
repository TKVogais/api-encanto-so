const { Op } = require("sequelize");
const EtiquetasRepositorySequelize = require("../repositories/etiquetas.repository");
const Etiquetas = require("../sequelize/models/etiquetas.model");
const TryCatch = require("../util/try.catch");
const LoteEtiquetasRepositorySequelize = require("../repositories/lote.etiquetas.repository.sequelize");
const LoteEtiquetas = require("../sequelize/models/lotes.etiquetas.model");

class LotesEtiquetasService {

    static ERROR_REPO = "É necessário fornecer uma model.";

    constructor(repository) {
        this.repository = repository ? repository : new Error(this.ERROR_REPO);
    }

    static build(repository) {
        return repository ? new LotesEtiquetasService(repository) : new Error(this.ERROR_REPO)
    }

    async create(lote_etiqueta) {

        const { ano_colheita, ano_corte, semana_corte, semana_colheita } = lote_etiqueta

        let response

        response = await TryCatch(async () => {
            return await this.repository.findLoteSemanas(ano_colheita, ano_corte, semana_corte, semana_colheita)
        })

        if (response.data) {
            return {
                statusRequest: 200,
                statusResponse: 401,
                message: "O lote informado já existe!",
                data: response.data
            }
        }
        response = await TryCatch(async () => {
            return await this.repository.create(lote_etiqueta)
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

    async update(lt1) {

        let response
        const { id_lote_etiqueta, ano_colheita, ano_corte, semana_corte, semana_colheita } = lt1
        const aRepository = new EtiquetasRepositorySequelize(Etiquetas)

        const where = {
            [Op.and]: [
                { id_lote_etiqueta: id_lote_etiqueta },  // Adicionando a condição para o campo id_lote_etiqueta
                { status: { [Op.ne]: "Sem uso" } },  // A condição já existente
            ]
        };

        response = await TryCatch(async () => {
            return await aRepository.findAllWhere(where)
        })

        if (response.error) {
            return {
                statusRequest: 200,
                statusResponse: 401,
                message: "Não foi possível editar o lote de etiquetas!",
                data: response.data
            }
        }

        const etiquetas_lote = response.data
        const lt2 = await this.repository.findOne(id_lote_etiqueta)

        response = this.generateEtiquetas(id_lote_etiqueta, lt1, lt2, etiquetas_lote)

        if (response.error) {
            return {
                statusRequest: 200,
                statusResponse: 402,
                message: "Não foi possível editar o lote de etiquetas!",
                data: []
            }
        }

        const etiquetas = response.etiquetas

        response = await TryCatch(async () => {
            return await this.repository.update(lt1)
        })

        if (response.error) {
            return {
                statusRequest: 200,
                statusResponse: 403,
                message: "Não foi possível editar o lote de etiquetas!",
                data: response.data
            }
        }

        response = await TryCatch(async () => {
            return await aRepository.bulkUpdate(etiquetas)
        })

        if (response.error) {
            return {
                statusRequest: 200,
                statusResponse: 404,
                message: "Não foi possível editar o lote de etiquetas!",
                data: response.data
            }
        }

        return {
            statusRequest: 200,
            statusResponse: 200,
            message: "Lote de Etiquetas editado com sucesso!",
            data: response.data
        }
    }

    generateEtiquetas(id_lote_etiqueta, lt1, lt2, etiquetasInformadas) {
        let etiquetasComplementares = [];
        let data = {
            error: false,
            etiquetas: []
        }
        // Etiquetas a serem removidas (estão em lt2, mas não em lt1)
        for (let i = lt2.etiqueta_inicial; i <= lt2.etiqueta_final; i++) {
            if (i < lt1.etiqueta_inicial || i > lt1.etiqueta_final) {
                // A etiqueta está no lote editado, mas não no lote original
                etiquetasComplementares.push({
                    acao: 'remover',
                    etiqueta: {
                        id_lote_etiqueta,
                        etiqueta: String(i).padStart(4, '0'),
                        data: lt2.criacao,
                        semana_colheita: lt2.semana_colheita,
                        longitude: 0,
                        latitude: 0
                    }  // Agora a etiqueta será removida
                });
            }
        }

        // Etiquetas a serem adicionadas (estão em lt1, mas não em lt2)
        for (let i = lt1.etiqueta_inicial; i <= lt1.etiqueta_final; i++) {
            if (i < lt2.etiqueta_inicial || i > lt2.etiqueta_final) {
                // A etiqueta está no lote original, mas não no lote editado
                etiquetasComplementares.push({
                    acao: 'adicionar',
                    etiqueta: {
                        id_lote_etiqueta,
                        etiqueta: String(i).padStart(4, '0'),
                        data: lt1.criacao,
                        semana_colheita: lt1.semana_colheita,
                        longitude: 0,
                        latitude: 0,
                    }  // Agora a etiqueta será adicionada
                });
            }
        }

        // Resolver conflitos de adição e remoção para a mesma etiqueta
        let etiquetasMap = new Map();

        etiquetasComplementares.forEach(etiqueta => {
            if (etiquetasMap.has(etiqueta.etiqueta)) {
                let existingEtiqueta = etiquetasMap.get(etiqueta.etiqueta);

                // Se a etiqueta foi marcada para adicionar e remover, a prioridade é remover.
                // Se uma etiqueta foi removida no lote original mas aparece no lote editado, deve ser adicionada.
                if (existingEtiqueta.acao === 'adicionar' && etiqueta.acao === 'remover') {
                    existingEtiqueta.acao = 'remover';
                } else if (existingEtiqueta.acao === 'remover' && etiqueta.acao === 'adicionar') {
                    existingEtiqueta.acao = 'adicionar';
                }
            } else {
                etiquetasMap.set(etiqueta.etiqueta, etiqueta);
            }
        });

        data.etiquetas = Array.from(etiquetasMap.values());

        // Filtra as etiquetas removidas que já estão em uso e não permite a edição
        const etiquetasRemovidasSet = new Set(etiquetasInformadas.map(e => e.etiqueta));
        const etiquetasEmUso = data.etiquetas.filter(etiqueta => etiqueta.acao === 'remover' && etiquetasRemovidasSet.has(etiqueta.etiqueta));

        if (etiquetasEmUso.length > 0) {
            data.error = true
        }
        JSON.stringify(data)
        return data;
    }




}

module.exports = LotesEtiquetasService
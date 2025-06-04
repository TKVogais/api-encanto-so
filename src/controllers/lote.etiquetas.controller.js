const LoteEtiquetasRepositorySequelize = require("../repositories/lote.etiquetas.repository.sequelize");
const LotesEtiquetasService = require("../services/lotes.etiquetas.service")
const LoteEtiquetas = require("../sequelize/models/lotes.etiquetas.model");
const Etiquetas = require("../sequelize/models/etiquetas.model");
const EtiquetasRepositorySequelize = require("../repositories/etiquetas.repository");
const EtiquetasService = require("../services/etiquetas.service");

class LoteEtiquetasController {
    constructor() { }

    static build() {
        return new LoteEtiquetasController();
    }

    // Método que gera as rotas
    static generateRoutes() {
        const controllerInstance = this.build();

        // Remove "Controller" do nome da classe
        const className = this.name.replace(/Controller$/, '');

        // Gera o nome base do path, separando as palavras e tornando minúsculas
        let pathBase = className.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

        // Corrige a pluralização para evitar repetição de "s"
        if (!pathBase.endsWith('s')) {
            pathBase += 's';
        }

        // Mapeamento das iniciais para os métodos HTTP
        const methodMap = {
            p: 'post',
            g: 'get',
            d: 'delete',
            u: 'put'
        };

        return Object.getOwnPropertyNames(this.prototype)
            .filter(methodName => methodName !== 'constructor' && methodName !== 'generateRoutes')
            .map(methodName => {
                const methodType = methodName.charAt(0).toLowerCase(); // Extrai a inicial do método
                const httpMethod = methodMap[methodType]; // Obtém o método HTTP a partir do mapeamento

                if (!httpMethod) {
                    throw new Error(`Método desconhecido: ${methodName}`);
                }

                // Gera o path para a rota, removendo a primeira letra do método e colocando em minúsculas
                const path = `/${pathBase}/${methodName.slice(1).toLowerCase()}`;

                return {
                    path: path, // Nome da rota
                    method: httpMethod, // Método HTTP
                    controller: controllerInstance[methodName].bind(controllerInstance) // Vincula o método ao contexto da instância
                };
            });
    }


    async pCreate(req, res) {
        const aRepository = LoteEtiquetasRepositorySequelize.build(LoteEtiquetas);
        const aService = LotesEtiquetasService.build(aRepository)
        const lote_etiqueta = req.body
        let response = await aService.create(lote_etiqueta);

        let lote_etiquetas = {
            ...response.data,
            etiquetas: []
        }

        if (response.statusResponse === 200) {
            const bRepository = EtiquetasRepositorySequelize.build(Etiquetas);
            const bService = EtiquetasService.build(bRepository)
            const id_lote_etiqueta = response.data.id_lote_etiqueta

            response = await bService.create(lote_etiqueta, id_lote_etiqueta)
            const etiquetas = await bService.list(lote_etiquetas.id_lote_etiqueta)
            lote_etiquetas.etiquetas = etiquetas
        }

        const json = {
            data: lote_etiquetas,
            message: response.message,
            status: response.statusResponse
        }

        res.status(response.statusRequest).json(json).send()
    }

    async gList() {

    }

    async pUpdate(req, res) {
        const aRepository = LoteEtiquetasRepositorySequelize.build(LoteEtiquetas);
        const aService = LotesEtiquetasService.build(aRepository)
        const lote_etiqueta = req.body
        let response = await aService.update(lote_etiqueta);

        if (response.statusResponse === 200) {
            const bRepository = EtiquetasRepositorySequelize.build(Etiquetas);
            const bService = EtiquetasService.build(bRepository)
            const etiquetas = await bService.list(lote_etiqueta.id_lote_etiqueta)
            lote_etiqueta.etiquetas = etiquetas
        }

        const json = {
            data: lote_etiqueta,
            message: response.message,
            status: response.statusResponse
        }
        res.status(response.statusRequest).json(json).send()
    }
}

module.exports = LoteEtiquetasController
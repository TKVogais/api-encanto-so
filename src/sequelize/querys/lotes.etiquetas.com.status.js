const LoteEtiquetas = require('../models/lotes.etiquetas.model');
const Etiquetas = require('../models/etiquetas.model');
const StatusEtiquetas = require('../models/status.etiquetas.model')

const findAllLotesComEtiquetas = async () => {
    try {
        // Consultar lotes
        const lotes = await LoteEtiquetas.findAll({
            include: [
                {
                    model: Etiquetas,
                    include: [
                        {
                            model: StatusEtiquetas,
                            attributes: ['nome'] // Retorna o campo 'nome' de StatusEtiquetas
                        }
                    ],
                }
            ],
        });

        console.log("===============================")
        console.log(JSON.stringify(lotes))
        console.log("===============================")

        // Transformar os dados no formato esperado
        const resultado = lotes.map(lote => ({
            id_lote_etiqueta: lote.id_lote_etiqueta,
            id_usuario: lote.id_usuario,
            criacao: lote.criacao,
            semana_corte: lote.semana_corte,
            semana_colheita: lote.semana_colheita,
            ano_corte: lote.ano_corte,
            ano_colheita: lote.ano_colheita,
            etiqueta_inicial: lote.etiqueta_inicial,
            etiqueta_final: lote.etiqueta_final,
            etiquetas: lote.etiquetas
                .map(etiqueta => ({
                    id_etiqueta: etiqueta.id_etiqueta,
                    etiqueta: etiqueta.etiqueta,
                    semana_colheita: etiqueta.semana_colheita,
                    id_status: etiqueta.id_status,
                    status: etiqueta.status_etiqueta.nome, // Pega o nome do status
                    data: etiqueta.data,
                    id_area: etiqueta.id_area
                }))
                .sort((a, b) => a.etiqueta.localeCompare(b.etiqueta)),
        }));

        return resultado;
    } catch (error) {
        console.error('Erro ao buscar lotes com etiquetas:', error);
        throw error;
    }
}


module.exports = findAllLotesComEtiquetas
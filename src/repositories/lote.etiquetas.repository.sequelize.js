const findAllLotesComEtiquetas = require('../sequelize/querys/lotes.etiquetas.com.status');

class LoteEtiquetasRepositorySequelize {
  // Variáveis restritas à classe para mensagens de erro
  static ERROR_MODEL_REQUIRED = "É necessário fornecer uma model.";

  constructor(model) {
    this.model = model ? model : new Error(this.ERROR_MODEL_REQUIRED);
  }

  static build(model) {
    return model ? new LoteEtiquetasRepositorySequelize(model) : new Error(this.ERROR_MODEL_REQUIRED);
  }

  async create(lote_etiqueta) {

    const { dataValues } = await this.model.create(lote_etiqueta)

    return dataValues
  }

  async findLoteSemanas(ano_colheita, ano_corte, semana_corte, semana_colheita) {
    const { Op } = require('sequelize'); // Certifique-se de importar o Op

    // Realizando a busca usando `Op.and` para combinar as condições
    const response = await this.model.findOne({
      where: {
        [Op.and]: [
          { semana_corte: semana_corte },
          { semana_colheita: semana_colheita },
          { ano_corte: ano_corte },
          { ano_colheita: ano_colheita } // Adiciona a condição para o ano_colheita
        ]
      }
    });

    // Retorna os valores ou null se não houver nenhum resultado
    return response ? response.dataValues : null;
  }
  async findAll() {
    const response = await findAllLotesComEtiquetas()

    return response ? response : [];
  }

  async findOne(id_lote_etiqueta) {
    return await this.model.findOne({
      where: {
        id_lote_etiqueta
      }
    })
  }

  async update(lote_etiqueta) {
    return await this.model.update(lote_etiqueta, {
      where: {
        id_lote_etiqueta: lote_etiqueta.id_lote_etiqueta
      }
    })
  }
}

module.exports = LoteEtiquetasRepositorySequelize
class LoteEtiquetas {
    // Construtor privado
    constructor(props) {
        this.props = props;
    }

    // Método estático para criar um novo produto com quantidade inicial de 0
    static create(criacao, semana_corte, semana_colheita, etiqueta_inicial, etiqueta_final) {
        return new LoteEtiquetas({
            criacao,
            semana_corte,
            semana_colheita,
            etiqueta_inicial,
            etiqueta_final
        });
    }

    // Método estático para criar um produto com um id, nome, preço e quantidade específicos

    // Getter para 'id_lote_etiqueta'
    get id_lote_etiqueta() {
        return this.id_lote_etiqueta;
    }

    // Getter para 'criacao'
    get criacao() {
        return this.criacao;
    }

    // Getter para 'semana_corte'
    get semana_corte() {
        return this.semana_corte;
    }

    // Getter para 'semana_colheita'
    get semana_colheita() {
        return this.semana_colheita;
    }

    // Getter para 'etiqueta_inicial'
    get etiqueta_inicial() {
        return this.etiqueta_inicial;
    }

    // Getter para 'etiqueta_final'
    get etiqueta_final() {
        return this.etiqueta_final;
    }

}

module.exports = LoteEtiquetas;

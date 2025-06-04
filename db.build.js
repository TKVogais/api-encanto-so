const { hash } = require("./src/util/hash");

(async () => {
    const database = require("./src/sequelize/config/config")

    const LoteEtiquetas = require("./src/sequelize/models/lotes.etiquetas.model")
    const Etiquetas = require("./src/sequelize/models/etiquetas.model")
    const Usuarios = require("./src/sequelize/models/usuarios.model")
    const Permissoes = require("./src/sequelize/models/permissoes.model")
    const DadosBancarios = require("./src/sequelize/models/dados.bancarios.model")
    const Permissoes_Usuarios = require("./src/sequelize/models/permissoes.usuarios.model")
    const Pessoas = require("./src/sequelize/models/pessoas.model")
    const StatusEtiquetas = require("./src/sequelize/models/status.etiquetas.model")
    await database.sync({ force: true })

    await Usuarios.create({
        usuario: "gabriel_vogais",
        senha: await hash("teste")
    })
    

    await StatusEtiquetas.create({
        nome: "SEM USO"
    })
    console.log("Executei")
    process.exit(0)
})();
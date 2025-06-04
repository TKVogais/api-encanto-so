const UsuariosRepositorySequelize = require('../repositories/usuarios.repository.sequelize')
const Usuarios = require('../sequelize/models/usuarios.model')
const UsuariosService = require('../services/usuarios.service')
const Controller = require('./controller.controller')

class UsuariosController extends Controller {
    constructor() {
        super()
    }

    async pCreate(req, res) {
        res.status(200).json({ message: 'Usuário criado' }).send()
    }

    async gList(req, res) {
        res.status(200).json({ usuarios: [] }).send()
    }

    async pLogin(req, res) {
        // Extrai os dados enviados para autenticação
        const { usuario, senha } = req.body
        //Inicializa o repositório dos usuários
        const aRepository = UsuariosRepositorySequelize.build(Usuarios)
        //Inicializa a service dos usuarios
        const aService = UsuariosService.build(aRepository)
        //Resultado da autenticação
        const responseServiceUsuario = await aService.authenticate(usuario, senha);
        //Deseestruturação da resposta
        const { statusResponse, statusRequest, data, message } = responseServiceUsuario
        //Objeto de retorno
        const json = {
            ...data,
            message: message,
            status: statusResponse
        }
        //Retorno do End-Point
        res.status(statusRequest).json(json).send()
    }
}

module.exports = UsuariosController

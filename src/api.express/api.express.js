const cors = require('cors');
const express = require("express");

class ApiExpress {
    constructor(app) {
        this.app = app;
    }

    // Método para configurar os controllers e gerar as rotas
    buildControllers(controllers = []) {
        controllers.forEach(controller => {
            const routes = controller.constructor.generateRoutes();
            this.buildRoutes(routes);
        });
    }

    static build() {
        const app = express();
        app.options('*', cors());
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            app.use(cors());
            next();
        });

        // Configurações adicionais
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        return new ApiExpress(app);
    }

    // Mapeamento dos métodos HTTP para os métodos do Express
    routeMethods = {
        get: 'get',
        post: 'post',
        put: 'put',
        delete: 'delete'
    };

    // Método para configurar as rotas a partir de uma lista de rotas
    buildRoutes(routes = []) {
        routes.forEach(route => {
            const method = this.routeMethods[route.method.toLowerCase()];
            if (method) {
                this.app[method](route.path, route.controller);
            } else {
                console.warn(`Método HTTP desconhecido: ${route.method}`);
            }
        });
    }

    // Método para iniciar o servidor
    start(port = 4000) {
        this.app.listen(port, () => {
            console.log(`Executando o servidor na porta ${port}`);
            this.printRoutes();
        });
    }

    // Método para listar todas as rotas configuradas
    printRoutes() {
        const routes = this.app._router.stack
            .filter(route => route.route)
            .map(route => ({
                path: route.route.path,
                method: route.route.stack[0].method
            }));

        console.log(routes);
    }
}

module.exports = ApiExpress;

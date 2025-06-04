const ApiExpress = require("./api.express/api.express")
const controllers = require("./api.express/api.express.controllers")

const main = () => {
    const apiExpress = ApiExpress.build()
    apiExpress.buildControllers(controllers)
    apiExpress.start()
}
main()
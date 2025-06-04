class Controller {
  constructor() { }

  static build() {
    return new this()
  }

  // Método base para geração de rotas
  static generateRoutes() {
    const controllerInstance = this.build()

    const className = this.name.replace(/Controller$/, '')
    let pathBase = className.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

    if (!pathBase.endsWith('s')) {
      pathBase += 's'
    }

    const methodMap = {
      p: 'post',
      g: 'get',
      d: 'delete',
      u: 'put'
    }

    return Object.getOwnPropertyNames(this.prototype)
      .filter(methodName => methodName !== 'constructor' && methodName !== 'generateRoutes')
      .map(methodName => {
        const methodType = methodName.charAt(0).toLowerCase()
        const httpMethod = methodMap[methodType]

        if (!httpMethod) {
          throw new Error(`Método desconhecido: ${methodName}`)
        }

        const path = `/${pathBase}/${methodName.slice(1).toLowerCase()}`

        return {
          path,
          method: httpMethod,
          controller: controllerInstance[methodName].bind(controllerInstance)
        }
      })
  }
}

module.exports = Controller

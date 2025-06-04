
const banco_de_dados = {
    desenvolvimento: {
        db: "NODE_DB_LOCAL",
        host: "NODE_HOST_LOCAL",
        dialect: "mysql",
        pass: "NODE_PASS_LOCAL",
        user: "NODE_USER_LOCAL",
        logging: true
    },
    producao: {
        db: "NODE_DB_HOSTINGER",
        host: "NODE_HOST_HOSTINGER",
        dialect: "mysql",
        pass: "NODE_PASS_HOSTINGER",
        user: "NODE_USER_HOSTINGER",
        logging: false
    },
    mongo: {
        user: "NODE_USER_MONGO",
        pass: "NODE_PASS_MONGO",
        db: "NODE_DB_MONGO"
    }
}

module.exports = banco_de_dados

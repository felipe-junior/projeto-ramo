const {Sequelize} = require('sequelize')

const config = new Sequelize({
    host: "localhost",
    username: "root",
    password: "123456",//290520
    database: "projetoramo",
    dialect: "mysql",
    timezone: "-03:00",
    query: {raw: true}
})
module.exports = config

const {Sequelize} = require('sequelize')

const config = new Sequelize({
    host: "localhost",
    username: "root",
    password: 123456,
    database: "projetoramo",
    dialect: "mysql",
    sync: {force: false},
    query: {raw: true}
})
module.exports = config
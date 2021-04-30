const {Sequelize} = require('sequelize')

const config = new Sequelize({
    host: "localhost",
    username: "root",
    password: "18051300psf",
    //password: "290520",
    database: "projetoramo",
    dialect: "mysql",
    query: {raw: true}
})
module.exports = config
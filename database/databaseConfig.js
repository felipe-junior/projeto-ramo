const {Sequelize} = require('sequelize')

const config = new Sequelize({
    host: "localhost",
    username: "root",
    //password: "290520",
    password: "18051300psf",
    database: "projetoramo",
    dialect: "mysql",
    timezone: "-03:00"
    //query: {raw: true}
})
module.exports = config

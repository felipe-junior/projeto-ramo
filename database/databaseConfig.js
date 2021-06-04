const {Sequelize} = require('sequelize')
const fs = require('fs')

const json = fs.readFileSync(__dirname + "\\senha.json", {encoding: 'utf8'})
const admin = JSON.parse(json)

console.log(admin)

const config = new Sequelize({
    host: "localhost",
    username: "root",
    password: admin.senha,
   
    database: "projetoramo",
    dialect: "mysql",
    timezone: "-03:00"
})
module.exports = config

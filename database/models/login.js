const loginConnection = require("../databaseConfig")
const sq = require("sequelize")

//Nome do tabela "login"
const login = loginConnection.define("login", {
    username: {
        type: sq.STRING,
        allowNull: false  
    },
    email: {
        type: sq.STRING,
        allowNull: false
    },
    senha: {
        type: sq.STRING,
        allowNull: false
    }
})

login.sync({force: false})
module.exports = login
const loginConnection = require("../database/databaseConfig")
const sq = require("sequelize")

const login = loginConnection.define("logins", {
    username: {
        type: sq.STRING,
        allowNull: false  
    },
    email: {
        type: sq.STRING,
        allowNull: false
    },
    password: {
        type: sq.STRING,
        allowNull: false
    }
})

module.exports = login
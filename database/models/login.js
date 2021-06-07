const loginConnection = require("../databaseConfig")
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

login.sync({force: false})
module.exports = login
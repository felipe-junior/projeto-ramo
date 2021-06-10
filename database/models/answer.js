const sq = require("sequelize")
const loginConnection = require("../databaseConfig")
const question = require("./question")
const user = require("./login")

const answer = loginConnection.define('answers', {
    description:{
        type: sq.TEXT,
        allowNull: false
    },
    createdAt: {
        type: sq.DATEONLY,
        allowNull: false
    }
})

module.exports = answer
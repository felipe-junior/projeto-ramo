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

question.hasMany(answer)
answer.belongsTo(question)

user.hasMany(answer)
answer.belongsTo(user)

answer.sync({force: false, alter: true})
module.exports = answer
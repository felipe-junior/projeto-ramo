const Sequelize = require("sequelize")
const loginConnection = require("../databaseConfig")
const Pergunta = require("./pergunta")
const Usuario = require("./login")

const Resposta = loginConnection.define('resposta', {
    desc:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})

Pergunta.hasMany(Resposta)
Resposta.belongsTo(Pergunta)

Usuario.hasMany(Resposta)
Resposta.belongsTo(Usuario)

Resposta.sync({force: false})
module.exports = Resposta
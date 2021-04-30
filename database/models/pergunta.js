const loginConnection = require("../databaseConfig")
const sq = require("sequelize")

const pergunta = loginConnection.define('pergunta', {
    titulo:{
        type: sq.STRING,
        allowNull: false
    },
    desc:{
        type: sq.TEXT,
        allowNull: false
    }
});

pergunta.sync({force: false});
module.exports = pergunta;
const loginConnection = require("../databaseConfig")
const sq = require("sequelize")

const categoria = loginConnection.define('categoria', {
    titulo:{
        type: sq.STRING,
        allowNull: false
    },
    slug:{
        type: sq.STRING,
        allowNull: false
    },
    numberOfQuestions:{
        type: sq.INTEGER,
        defaultValue: 0
    }
});

categoria.sync({force: false});
module.exports = categoria;
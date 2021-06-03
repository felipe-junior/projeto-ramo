const loginConnection = require("../databaseConfig")
const sq = require("sequelize")
const categoria = require("./categoria");

const pergunta = loginConnection.define('pergunta', {
    titulo:{
        type: sq.STRING,
        allowNull: false
    },
    desc:{
        type: sq.TEXT,
        allowNull: false
    },
    slug:{
        type: sq.TEXT,
        allowNull: false
    },
    createdAt: {
        type: sq.DATEONLY,
        allowNull: false
    }
});

pergunta.belongsTo(categoria);
categoria.hasMany(pergunta);
pergunta.sync({force: false});
module.exports = pergunta;
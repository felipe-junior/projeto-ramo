const loginConnection = require("../databaseConfig")
const sq = require("sequelize")

const category = loginConnection.define('categories', {
    title:{
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

category.sync({force: false, alter: true})
module.exports = category
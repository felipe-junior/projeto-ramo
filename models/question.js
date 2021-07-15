const loginConnection = require("../database/databaseConfig")
const sq = require("sequelize")
const category = require("./category");
const user = require("./login");

const question = loginConnection.define('questions', {
    title:{
        type: sq.STRING,
        allowNull: false
    },
    description:{
        type: sq.TEXT,
        allowNull: false
    },
    slug:{
        type: sq.TEXT,
        allowNull: false
    },
    createdAt: {
        type: sq.DATEONLY,
        allowNull: false,
      }

});


module.exports = question
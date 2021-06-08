const loginConnection = require("../databaseConfig")
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

question.belongsTo(category)
category.hasMany(question)
question.belongsTo(user)
user.hasMany(question)
question.sync({force: false})
module.exports = question
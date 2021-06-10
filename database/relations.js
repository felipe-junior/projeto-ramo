const answer = require("./models/answer");
const category = require("./models/category");
const user = require("./models/login");
const question = require("./models/question");



async function relationCreate(){
    
    question.hasMany(answer)
    answer.belongsTo(question)
    user.hasMany(answer)
    answer.belongsTo(user)
    //Answer
    
    question.belongsTo(category)
    category.hasMany(question)
    question.belongsTo(user)
    user.hasMany(question)
    //questions
    await category.sync({force: false, alter: true})
    await user.sync({force: false, alter: true})
    await question.sync({force: false, alter: true})
    await answer.sync({force: false, alter: true})
}
module.exports = relationCreate
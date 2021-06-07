const Router = require("express")
const Category = require("./database/models/category")

Category.count().then(count =>{
    if(count == 0)
      Category.create({
          title: "Esporte",
          slug: "Esporte",
          numberOfQuestions: '0'
      }).then(Category.create({
        title: "Notícias",
        slug: "Notícias",
        numberOfQuestions: '0'
    })).then(Category.create({
        title: "Ciências",
        slug: "Ciências",
        numberOfQuestions: '0'
    })).then(Category.create({
        title: "Curiosidades",
        slug: "Curiosidades",
        numberOfQuestions: '0'
    }))
  })


module.exports = Router;
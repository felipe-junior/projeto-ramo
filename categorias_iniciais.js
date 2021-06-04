const rota = require("express")
const Categoria = require("./database/models/categoria")

Categoria.count().then(c =>{
    if(c == 0)
      Categoria.create({
          titulo: "Esporte",
          slug: "Esporte",
          numberOfQuestions: '0'
      }).then(Categoria.create({
        titulo: "Notícias",
        slug: "Notícias",
        numberOfQuestions: '0'
    })).then(Categoria.create({
        titulo: "Ciências",
        slug: "Ciências",
        numberOfQuestions: '0'
    })).then(Categoria.create({
        titulo: "Curiosidades",
        slug: "Curiosidades",
        numberOfQuestions: '0'
    }))
  })


module.exports = rota;
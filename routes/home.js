const rota = require('express').Router()
const Categoria = require('../database/models/categoria')
const Pergunta = require('../database/models/pergunta')
const categorias_iniciais = require('../categorias_iniciais')

rota.get("/", (req, res)=>{
  Pergunta.findAll({
    include: [{model: Categoria}]
  }).then(discussao =>{
    res.render("index", {discussao})
  })
  categorias_iniciais() //função pra testar a adição de categorias iniciais, comentado mais sobre no arquivo importado
})

module.exports = rota


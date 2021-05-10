const rota = require('express').Router()
const teste = require('../teste_cat_ini')

rota.get("/", (req, res)=>{
  res.render("index")
  teste() //função pra testar a adição de categorias iniciais, comentado mais sobre no arquivo importado
})

module.exports = rota


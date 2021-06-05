const rota = require('express').Router()
const Categoria = require('../database/models/categoria')
const Pergunta = require('../database/models/pergunta')
const formatDate = require('../public/js/formataData')

//Rotas get
rota.get("/", async (req, res)=>{
  const limit = 20
  const offset = 0
   Pergunta.findAndCountAll({
    order:[['id', 'DESC']],
    include: [{model: Categoria}],
    offset: offset, 
    limit:limit,
     raw: true
  }).then(discussions =>{
    let next
    if(offset + limit >= discussions.count){
      next= false
    } else{
      next= true
    }
    const result = {
      next: next,
      page: 1,
      formatDate: formatDate
    }
    res.render("index", {discussions: discussions.rows, result})
  })
})

rota.get("/page/:id", async (req, res)=>{
  let id = req.params.id
  if(id==undefined || id<=0){// Caso o usuario nao passe o parametro id
    id=1
  } 
  if(isNaN(id)){
    res.status(404).send("pagina nao encontrada")
    return
  }
  const limit = 20
  const offset = id * limit -limit
  
  Pergunta.findAndCountAll({
    order:[['id', 'DESC']],
    include: [{model: Categoria}],
    offset: offset, 
    limit:limit
    }).then(discussions =>{
    let next
    if(offset + limit >= discussions.count){
      next= false
    } else{
      next= true
    }
    
    const result = {
      next: next,
      page: parseInt(id),
      data: formatDate
    }
    res.render("index", {discussions: discussions.rows, result})
  })

})

module.exports = rota


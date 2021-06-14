const Router = require("express").Router()
const Category = require('../database/models/category')
const User = require("../database/models/login")
const Question = require('../database/models/question')
const formatDate = require('../public/js/formatDate')

//Rotas get
Router.get("/", async (req, res)=>{
  let session = req.session.user != undefined ? true : false
  const limit = 20
  const offset = 0
   Question.findAndCountAll({
    order:[['id', 'DESC']],
    include: [{model: Category}, {model: User}],
    offset: offset, 
    limit:limit,
     //raw: true    //Foi o que tava dando problema no JOIN antes
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
    res.render("index", {discussions: discussions.rows, result, session})
  })
})

Router.get("/page/:id", async (req, res)=>{
  let session = req.session.user != undefined ? true : false
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
  
  Question.findAndCountAll({
    order:[['id', 'DESC']],
    include: [{model: Category}],
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
      formatDate: formatDate
    }
    res.render("index", {discussions: discussions.rows, result, session})
  })

})

module.exports = Router


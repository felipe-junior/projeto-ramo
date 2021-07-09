const Router = require("express").Router()
const Category = require('../models/category')
const User = require("../models/login")
const Question = require('../models/question')
const formatDate = require('../public/js/formatDate')
const slugify = require("slugify")
const {Op} = require("sequelize")

//Home
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

//Home com paginação
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

//Pesquisar discussão
Router.post("/pesquisardiscussao", (req, res)=>{
    let search = req.body.search.trim()
    if(search == ""){
        res.redirect("/")
    }
    else{
        let slug = slugify(search)

        res.redirect("/pesquisa/"+ slug)
    }
    
})

//Página de pesquisa
Router.get("/pesquisa/:slug", (req,res)=>{
    let session = req.session.user != undefined ? true : false
    const limit = 20
    const offset = 0
    let slug = req.params.slug
    let title = slug.split("-").join(" ")
    Question.findAndCountAll({
        include:[{model: Category}, {model:User}],
        order:[['id', 'DESC']],
        where: {
            title: {
                [Op.like]: '%'+title+'%'
            }
        },
        offset: offset, 
        limit:limit
    }).then(questions =>{
        
        let next
        if(offset + limit >= questions.count){
            next = false
        } else{
            next = true
        }
          
        const result = {
            next: next,
            page: 1,
            date: formatDate
        }
        res.render("searchDiscussion", {questions: questions.rows, title, result, session})
    })
   
})

//Página de pesquisa com paginação
Router.get("/pesquisa/:slug/page/:id", (req,res)=>{
    let session = req.session.user != undefined ? true : false

    let id = req.params.id
    let slug = req.params.slug
    let title = slug.split("-").join(" ")

    if(id == undefined || id <= 0){
        id = 1
    }
    if(isNaN(id)){
        res.status(404).send("pagina nao encontrada")
        return
    }
    const limit = 20
    const offset = id * limit - limit

    Question.findAndCountAll({
        order:[['id', 'DESC']],
        include:[{model: Category}],
        where: {
            title: {
                [Op.like]: '%'+title+'%'
            }
        },
        offset: offset, 
        limit:limit
    }).then(questions =>{
        let next
        if(offset + limit >= questions.count){
            next= false
          } else{
            next= true
          }
          
          const result = {
            next: next,
            page: parseInt(id),
            date: formatDate
          }
        res.render("searchDiscussion", {questions: questions.rows, title, result, session})
    })
   
})

//Créditos
Router.get("/creditos", (req, res)=>{
    let session = req.session.user != undefined ? true : false

    res.render("credits", {session})
})

module.exports = Router
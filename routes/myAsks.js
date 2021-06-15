const Router = require("express").Router()
const Category = require('../database/models/category')
const User = require("../database/models/login")
const Question = require('../database/models/question')
const askAuth = require("../middleware/askAuth")
const formatDate = require('../public/js/formatDate')

//Rotas get
Router.get("/minhas-perguntas", askAuth, async (req, res)=>{
    let session = req.session.user != undefined ? true : false
    const limit = 5
    const offset = 0

    const email = req.session.user
    let userId
    await User.findOne({where: {email: email}}).then(user =>{
        userId = user.id
    })

   Question.findAndCountAll({
    order:[['id', 'DESC']],
    include: [{model: Category}, {model: User}],
    offset: offset, 
    limit:limit,
    where: {loginId: userId}
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
    res.render("myAsks", {discussions: discussions.rows, result, session})
  })
})

Router.get("/minhas-perguntas/page/:id",askAuth ,async (req, res)=>{
  let session = req.session.user != undefined ? true : false
  let id = req.params.id
  if(id==undefined || id<=0){// Caso o usuario nao passe o parametro id
    id=1
  } 
  if(isNaN(id)){
    res.status(404).send("pagina nao encontrada")
    return
  }
  const limit = 5
  const offset = id * limit -limit
  
  const email = req.session.user
    let userId
    await User.findOne({where: {email: email}}).then(user =>{
        userId = user.id
    })
  Question.findAndCountAll({
    order:[['id', 'DESC']],
    include: [{model: Category}, {model: User}],
    offset: offset, 
    limit:limit,
    where:{loginId: userId}
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
    res.render("myAsks", {discussions: discussions.rows, result, session})
  })

})

module.exports = Router


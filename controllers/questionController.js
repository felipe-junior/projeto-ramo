const Router = require("express").Router()
const Question = require("../models/question")
const Category= require("../models/category")
const slugify = require("slugify")
const askAuth = require("../middleware/askAuth")
const User = require("../models/login")
const Answer = require("../models/answer")
const formatDate = require("../public/js/formatDate")

//Perguntar
Router.get("/perguntar", (req, res) =>{
    req.session.returnTo = req.originalUrl
    let session = req.session.user != undefined ? true : false

    let titleError = req.flash("titleError")
    let descrError = req.flash("descrError")
    titleError = (titleError == undefined || titleError.length == 0) ? undefined : titleError
    descrError = (descrError == undefined || descrError.length == 0) ? undefined : descrError

    let title = req.flash("title")
    let description = req.flash("description")
    title = (title == undefined || title.length == 0) ? "" : title
    description = (description == undefined || description.length == 0) ? "" : description

    Category.findAll().then(categories =>{
        res.render("ask", {categories: categories, session, titleError, descrError, title, description})
    })
})

//Salvar pergunta
Router.post("/salvarpergunta", askAuth ,async (req, res) =>{
    let t = req.body.title
    let d = req.body.description
    let c = req.body.category
    let user = req.session.user

    //Erros
    let titleError, descrError
    if(t == undefined || t == ""){
        titleError = "O campo de titulo precisa ser preenchido"
    }
    if(d == undefined || d == ""){
        descrError = "O campo de descrição precisa ser preenchido"
    }

    if(titleError != undefined || descrError != undefined){
        req.flash("titleError", titleError)
        req.flash("descrError", descrError)
        req.flash("title", t)
        req.flash("description", d)
        res.redirect("/perguntar")
    }
    else{
        await Category.findOne({where: {id: c}}).then(category =>{
        if(category != undefined){
            category.numberOfQuestions += 1
            category.update({numberOfQuestions: category.numberOfQuestions}).then().catch(err=>console.log(err))
        }   
        })
        let id
        await User.findOne({where: {email: user}}).then(value =>{
            id = value.id
        })
        await Question.create({
            title: t,
            description: d,
            slug: slugify(t) + "-"+ id,
            categoryId: c,
            loginId: id
        }).then(() =>{
            const path = slugify(t) + "-"+ id
            res.redirect("/discussao/" + path)
        })
    }
})

//Página da discussão
Router.get("/discussao/:slug", async (req, res)=>{
    let session = req.session.user != undefined ? true : false

    let descriptionError = req.flash("descriptionError")
    descriptionError = (descriptionError == undefined || descriptionError.length == 0) ? undefined : descriptionError

    req.session.returnTo = req.originalUrl
    const {slug} = req.params
    const id = 1
    await Question.findOne({where:{slug}, include: {model: User}}).then(ask=>{
        if(ask != undefined){
            const limit = 6
            const offset = limit * id - limit
            let next = true

            Answer.findAndCountAll({where:{questionId: ask.id}, limit, offset,  include: {model: User}}).then(answers=>{
                if( offset + limit >= answers.count)
                    next = false
                console.log(slug)
                let result = {
                    date: formatDate,
                    next,
                    page: parseInt(id),
                    slug
                }
                res.render("discussion", {ask, answers: answers.rows, result, session, descriptionError}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})

//Página da discussão com paginação
Router.get("/discussao/:slug/page/:id", async (req, res)=>{
    let session = req.session.user != undefined ? true : false
    req.session.returnTo = req.originalUrl
    const {slug, id} = req.params

    let descriptionError = req.flash("descriptionError")
    descriptionError = (descriptionError == undefined || descriptionError.length == 0) ? undefined : descriptionError
    
    await Question.findOne({where:{slug}, include: {model: User}}).then(ask=>{
        if(ask != undefined){
            const limit = 6
            const offset = limit * id - limit
            let next = true
            
             Answer.findAndCountAll({where:{questionId: ask.id}, limit, offset,  include: {model: User}}).then(answers=>{
                if( offset + limit >= answers.count)
                    next = false
                console.log(slug)
                let result = {
                    date: formatDate,
                    next,
                    page: parseInt(id),
                    slug
                }
                res.render("discussion", {ask, answers: answers.rows, result, session, descriptionError}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})

//Salvar resposta
Router.post("/salvaresposta", askAuth,async (req, res)=>{
   
    let description = req.body.description
    let askId = req.body.askId
    let askSlug = req.body.askSlug
    let email = req.session.user 
    let id
    await User.findOne({where: {email: email}}).then(value =>{
        id = value.id
    })

    if(description == undefined || description == ""){
        req.flash("descriptionError", "O campo de resposta precisa ser preenchido")
        res.redirect("/discussao/" + askSlug)
    }
    else{
        Answer.create({
            description,
            questionId: askId,
            loginId: id
        }).then(()=>{
            res.redirect("/discussao/" + askSlug)
        })
    }
})

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

module.exports = Router;
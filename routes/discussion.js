const Router = require("express").Router()
const Question = require("../database/models/question")
const Answer = require("../database/models/answer")
const formatDate = require("../public/js/formatDate")
const askAuth = require("../middleware/askAuth")
const User = require("../database/models/login")

//Rotas Get
Router.get("/discussao/:slug", async (req, res)=>{
    let session = req.session.user != undefined ? true : false

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
                res.render("discussion", {ask, answers: answers.rows, result, session}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})

Router.get("/discussao/:slug/page/:id", async (req, res)=>{
    let session = req.session.user != undefined ? true : false
    req.session.returnTo = req.originalUrl
    const {slug, id} = req.params
    
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
                res.render("discussion", {ask, answers: answers.rows, result, session}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})

//Rotas Post
Router.post("/salvaresposta", askAuth,async (req, res)=>{
   
    let description = req.body.description
    let askId = req.body.askId
    let askSlug = req.body.askSlug
    let email = req.session.user 
    let id
    await User.findOne({where: {email: email}}).then(value =>{
        id = value.id
    })
    Answer.create({
        description,
        questionId: askId,
        loginId: id
    }).then(()=>{
        res.redirect("/discussao/" + askSlug)
    })
})

//Falta o metodo delete, usar como base o codigo do arquivo perguntar para atualizar a quantidade de perguntas de uma categoria!

module.exports = Router
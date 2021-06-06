const Router = require("express").Router()
const Question = require("../database/models/question")
const Answer = require("../database/models/answer")
const formatDate = require("../public/js/formatDate")

//Rotas Get
Router.get("/discussao/:slug", async (req, res)=>{
    const {slug} = req.params
    const id = 1
    await Question.findOne({where:{slug}}).then(ask=>{
        if(ask != undefined){
            const limit = 6
            const offset = limit * id - limit
            let next = true

            Answer.findAndCountAll({where:{questionId: ask.id}, limit, offset}).then(answers=>{
                if( offset + limit >= answers.count)
                    next = false
                console.log(slug)
                let result = {
                    date: formatDate,
                    next,
                    page: parseInt(id),
                    slug
                }
                res.render("discussion", {ask, answers: answers.rows, result}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})

Router.get("/discussao/:slug/page/:id", async (req, res)=>{
    const {slug, id} = req.params
    
    await Question.findOne({where:{slug}}).then(ask=>{
        if(ask != undefined){
            const limit = 6
            const offset = limit * id - limit
            let next = true
            
             Answer.findAndCountAll({where:{questionId: ask.id}, limit, offset}).then(answers=>{
                if( offset + limit >= answers.count)
                    next = false
                console.log(slug)
                let result = {
                    date: formatDate,
                    next,
                    page: parseInt(id),
                    slug
                }
                res.render("discussion", {ask, answers: answers.rows, result}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})

//Rotas Post
Router.post("/salvaresposta", (req, res)=>{
    let description = req.body.description
    let askId = req.body.askId
    let askSlug = req.body.askSlug

    Answer.create({
        description,
        questionId: askId
    }).then(()=>{
        res.redirect("/discussao/" + askSlug)
    })
})

//Falta o metodo delete, usar como base o codigo do arquivo perguntar para atualizar a quantidade de perguntas de uma categoria!

module.exports = Router;
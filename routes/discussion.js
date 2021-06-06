const Router = require("express").Router()
const Question = require("../database/models/question")
const Answer = require("../database/models/answer")
const formatDate = require("../public/js/formataData")

//Rotas Get
Router.get("/discussao/:slug", (req, res)=>{

    let slug = req.params.slug

    Question.findOne({where:{slug}}).then(ask=>{
        if(ask != undefined){

            let result = {date: formatDate}

            Answer.findAll({where:{questionId: ask.id}}).then(answers=>{
               res.render("discussion", {ask, answers, result}) 
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

    Resposta.create({
        description,
        questionId: askId
    }).then(()=>{
        res.redirect("/discussao/" + askSlug)
    })
})

//Falta o metodo delete, usar como base o codigo do arquivo perguntar para atualizar a quantidade de perguntas de uma categoria!

module.exports = Router;
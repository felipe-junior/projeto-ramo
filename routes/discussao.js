const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")
const Resposta = require("../database/models/resposta")
const formataData = require("../public/js/formataData")

//Rotas Get
Router.get("/discussao/:slug", (req, res)=>{

    let slug = req.params.slug

    Pergunta.findOne({where:{slug}}).then(ask=>{
        if(ask != undefined){

            let result = {data: formataData}

            Resposta.findAll({where:{perguntumId: ask.id}}).then(answers=>{
               res.render("discussao", {ask, answers, result}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})

//Rotas Post
Router.post("/salvaresposta", (req, res)=>{
    let desc = req.body.desc
    let askId = req.body.askId
    let askSlug = req.body.askSlug

    Resposta.create({
        desc,
        perguntumId: askId
    }).then(()=>{
        res.redirect("/discussao/" + askSlug)
    })
})

//Falta o metodo delete, usar como base o codigo do arquivo perguntar para atualizar a quantidade de perguntas de uma categoria!

module.exports = Router;
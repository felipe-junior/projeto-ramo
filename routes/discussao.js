const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")
const Resposta = require("../database/models/resposta")
const formataData = require("../public/js/formataData")

//Rotas Get
Router.get("/discussao/:slug", async (req, res)=>{
    const {slug} = req.params
    const id = 1
    await Pergunta.findOne({where:{slug}}).then(ask=>{
        if(ask != undefined){
            const limit = 6
            const offset = limit * id - limit
            let next = true
            
             Resposta.findAndCountAll({where:{perguntumId: ask.id}, limit, offset}).then(answers=>{
                if( offset + limit >= answers.count)
                    next = false
                console.log(slug)
                let result = {
                    data: formataData,
                    next,
                    page: parseInt(id),
                    slug
                }
                res.render("discussao", {ask, answers: answers.rows, result}) 
            })
        }
        else{
            res.redirect("/")
        }
    })
})
Router.get("/discussao/:slug/page/:id", async (req, res)=>{
    const {slug, id} = req.params
    
    await Pergunta.findOne({where:{slug}}).then(ask=>{
        if(ask != undefined){
            const limit = 6
            const offset = limit * id - limit
            let next = true
            
             Resposta.findAndCountAll({where:{perguntumId: ask.id}, limit, offset}).then(answers=>{
                if( offset + limit >= answers.count)
                    next = false
                console.log(slug)
                let result = {
                    data: formataData,
                    next,
                    page: parseInt(id),
                    slug
                }
                res.render("discussao", {ask, answers: answers.rows, result}) 
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
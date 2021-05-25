const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")
const {Op} = require('sequelize')

//Rota Post
Router.post("/pesquisardiscussao", (req, res)=>{
    
    let slug = slugify(req.body.search)

    res.redirect("/pesquisa/d/"+ slug)
})

//Rota Get
Router.get("/pesquisa/d/:slug", (req,res)=>{
    
    let slug = req.params.slug
    let title = slug.split("-").join(" ")
    Pergunta.findAll({
        include:[{model: Categoria}],
        where: {
            titulo: {
                [Op.like]: '%'+title+'%'
            }
        }
    }).then(pergunta =>{
        res.render("pesquisa-discussao", {pergunta, title})
    })
   
})

module.exports = Router
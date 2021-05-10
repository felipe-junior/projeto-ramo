const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")

//Rotas Get
Router.get("/perguntar", (req, res) =>{
    Categoria.findAll().then(categorias =>{
        res.render("perguntar", {categorias: categorias})
    })
})

//Rotas Post
Router.post("/salvarpergunta", (req, res) =>{
    let t = req.body.title;
    let d = req.body.description;
    let c = req.body.category;
    Pergunta.create({
        titulo: t,
        desc: d,
        slug: slugify(t),
        categoriumId: c
    }).then(() =>{
        res.redirect("/")
    })
})



module.exports = Router;
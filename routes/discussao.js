const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")

//Rotas Get
Router.get("/discussao/1", (req, res)=>{
    res.render("discussao")
})

module.exports = Router;
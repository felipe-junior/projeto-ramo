const Router = require("express").Router()
//const Categories = require("../database/models/")

Router.get("/categorias", (req, res)=>{
    res.render("categorias")
})
Router.get("/categorias/novo", (req, res)=>{
    res.render("nova-categoria")
})
module.exports = Router
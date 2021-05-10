const Router = require("express").Router()
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")

//Rotas Get
Router.get("/categorias", (req, res)=>{
    res.render("categorias")
})
Router.get("/categorias/novo", (req, res)=>{
    res.render("nova-categoria")
})

//Rotas Post
Router.post("/salvarcategoria", (req, res)=>{
    let t = req.body.title;
    if(t != undefined){
        Categoria.create({
            titulo: t,
            slug: slugify(t)
        }).then(() =>{
            res.redirect("/categorias");
        })
    }
})


module.exports = Router
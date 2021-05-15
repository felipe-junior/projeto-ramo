const Router = require("express").Router()
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")

//Rotas Get
Router.get("/categorias", (req, res)=>{
    const arrayTemporario = [
        {nome: "Esportes", qtd: 23},
        {nome: "Noticias", qtd: 23},
        {nome: "Saude", qtd: 23},
        {nome: "Politica", qtd: 23},
        {nome: "Mundo", qtd: 23},
        {nome: "Variedades", qtd: 23},
        {nome: "Lazer", qtd: 23},
]
    res.render("categorias", {categorias: arrayTemporario})
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
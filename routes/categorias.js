const Router = require("express").Router()
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")

//Rotas Get
Router.get("/categorias", (req, res)=>{

    let categoria1 = {
        nome: "Esporte", 
        qtd: 25
    }
    let categoria2 = {
        nome: "Saúde", 
        qtd: 22
    }
    let categoria3 = {
        nome: "Educação", 
        qtd: 20
    }
    let categoria4 = {
        nome: "Esporte", 
        qtd: 25
    }
    let categoria5 = {
        nome: "Saúde", 
        qtd: 22
    }
    let categoria6 = {
        nome: "Educação", 
        qtd: 20
    }

    let categorias = [categoria1, categoria2, categoria3, categoria4, categoria5, categoria6]
    res.render("categorias", {categorias})
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
const Router = require("express").Router()
const Categoria = require("../database/models/categoria")
const Pergunta = require("../database/models/pergunta")
const slugify = require("slugify")

//Rotas Get
Router.get("/categorias", (req, res) => {
    Categoria.findAll().then(categorias => {
        res.render("categorias", {categorias})
    }).catch(err =>{
        console.log(err)
    })
})

Router.get("/categorias/novo", (req, res)=>{

    
    res.render("nova-categoria")
})

//Rotas Post
Router.post("/salvarcategoria", (req, res)=>{
    let t = req.body.title;
    if(t != ""){
        Categoria.create({
            titulo: t,
            slug: slugify(t)
        }).then(() =>{
            res.redirect("/categorias");
        })
    }
    else{
        res.redirect("/categorias/novo");
    }
})


module.exports = Router
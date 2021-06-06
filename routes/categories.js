const Router = require("express").Router()
const Category = require("../database/models/category")
const slugify = require("slugify")

//Rotas Get
Router.get("/categorias", (req, res) => {
    Category.findAll().then(categories => {
        res.render("categories", {categories})
    }).catch(err =>{
        console.log(err)
    })
})

Router.get("/categorias/novo", (req, res)=>{

    
    res.render("newCategory")
})

//Rotas Post
Router.post("/salvarcategoria", (req, res)=>{
    let t = req.body.title;
    if(t != ""){
        Category.create({
            title: t,
            slug: slugify(t)
        }).then(() =>{
            res.redirect("/categorias")
        })
    }
    else{
        res.redirect("/categorias/novo")
    }
})


module.exports = Router
const Router = require("express").Router()
const Categoria = require("../database/models/categoria")
const Pergunta = require("../database/models/pergunta")
const slugify = require("slugify")

//Rotas Get
Router.get("/categorias", async (req, res) => {
    let id = 1
    const limit = 10
    const offset = limit * id - limit
    
    
    Categoria.findAndCountAll({limit: limit, order: [['numberOfQuestions', 'DESC']]}).then(categorias => {
        let next = true
        if (offset + limit >= categorias.count)
            next = false
        const result = {
            next,
            page: parseInt(id)
        }
        res.render("categorias", {categorias: categorias.rows, result})
    }).catch(err =>{
        console.log(err)
    })
})

Router.get("/categoria/page/:id", async (req, res)=>{
    let {id} = req.params
    if(isNaN(id) || id===0){
        id = 1
        console.log("entrou")
    }
    const limit = 10
    const offset = (limit * id) - limit
    
    Categoria.findAndCountAll({limit, offset, order: [["numberOfQuestions", "DESC"]]}).then(categorias =>{
        let next = true
        if (offset + limit >= categorias.count)
            next = false
        const result = {
            next,
            page: parseInt(id)
        }
        res.render("categorias", {categorias: categorias.rows, result})
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
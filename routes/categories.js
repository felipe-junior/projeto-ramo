const Router = require("express").Router()
const Category = require("../database/models/category")
const slugify = require("slugify")
const askAuth = require("../middleware/askAuth")

//Rotas Get
Router.get("/categorias", (req, res) => {
    let id = 1
    const limit = 10
    const offset = limit * id - limit
    let session = req.session.user != undefined ? true : false

    Category.findAndCountAll({limit: limit, order: [['numberOfQuestions', 'DESC']]}).then(categories => {
        let next = true
        if (offset + limit >= categories.count)
            next = false
        const result = {
            next,
            page: parseInt(id)
        }
        res.render("categories", {categories: categories.rows, result, session})
    }).catch(err =>{
        console.log(err)
    })
})

Router.get("/categoria/page/:id", async (req, res)=>{
    let session = req.session.user != undefined ? true : false

    let {id} = req.params
    if(isNaN(id) || id===0){
        id = 1
        console.log("entrou")
    }
    const limit = 10
    const offset = (limit * id) - limit
    
    Category.findAndCountAll({limit, offset, order: [["numberOfQuestions", "DESC"]]}).then(categories =>{
        let next = true
        if (offset + limit >= categories.count)
            next = false
        const result = {
            next,
            page: parseInt(id)
        }
        res.render("categories", {categories: categories.rows, result, session})
    })
})

Router.get("/categorias/novo", (req, res)=>{
    let session = req.session.user != undefined ? true : false
    res.render("newCategory", {session})
})

//Rota Post
Router.post("/salvarcategoria", askAuth, (req, res)=>{
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
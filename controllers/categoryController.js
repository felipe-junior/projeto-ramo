const Category = require("../models/category")
const Question = require("../models/question")
const formatDate = require("../public/js/formatDate")
const Router = require("express").Router()
const User = require("../models/login")
const slugify = require("slugify")
const askAuth = require("../middleware/askAuth")

//Página de discussões de uma categoria
Router.get("/categoria/:slug", async (req, res)=>{
    let session = req.session.user != undefined ? true : false
    const slug = req.params.slug
    
    let category = await Category.findOne({where:{slug}})

    if(category!=undefined){
        let discussions = await Question.findAll({
            where:{categoryId: category.id}, include: [{model:Category}, {model: User}], order:[['id','DESC']]
        })
        res.render("filterByCategory", {discussions, formatDate, category, session})
    } else{
        res.redirect("/")
    }
})

//Página de categorias
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

//Página de categorias com paginação
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

//Página de criar categoria
Router.get("/categorias/novo", (req, res)=>{
    let session = req.session.user != undefined ? true : false
    res.render("newCategory", {session})
})

//Salvar cateogoria
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
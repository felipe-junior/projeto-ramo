const Router = require("express").Router()
const Question = require("../database/models/question")
const Category= require("../database/models/category")
const slugify = require("slugify")

//Rotas Get
Router.get("/perguntar", (req, res) =>{
    Category.findAll().then(categories =>{
        res.render("ask", {categories: categories})
    })
})

//Rotas Post
Router.post("/salvarpergunta", async (req, res) =>{
    let t = req.body.title
    let d = req.body.description
    let c = req.body.category
    await Category.findOne({where: {id: c}}).then(category =>{
        if(category != undefined){
            category.numberOfQuestions += 1
            category.update({numberOfQuestions: category.numberOfQuestions}).then().catch(err=>console.log(err))
        }   
    })
    Question.create({
        title: t,
        description: d,
        slug: slugify(t),
        categoryId: c,
    }).then(() =>{
        res.redirect("/")
    })
})



module.exports = Router;
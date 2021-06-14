const Router = require("express").Router()
const Question = require("../database/models/question")
const Category= require("../database/models/category")
const slugify = require("slugify")
const askAuth = require("../middleware/askAuth")
const User = require("../database/models/login")

//Rotas Get
Router.get("/perguntar", (req, res) =>{
    req.session.returnTo = req.originalUrl
    let session = req.session.user != undefined ? true : false
    Category.findAll().then(categories =>{
        res.render("ask", {categories: categories, session})
    })
})

//Rotas Post
Router.post("/salvarpergunta", askAuth ,async (req, res) =>{
    let t = req.body.title
    let d = req.body.description
    let c = req.body.category
    let user = req.session.user
    await Category.findOne({where: {id: c}}).then(category =>{
        if(category != undefined){
            category.numberOfQuestions += 1
            category.update({numberOfQuestions: category.numberOfQuestions}).then().catch(err=>console.log(err))
        }   
    })
    let id
    await User.findOne({where: {email: user}}).then(value =>{
        id = value.id
    })
    await Question.create({
        title: t,
        description: d,
        slug: slugify(t),
        categoryId: c,
        loginId: id
    }).then(() =>{
        res.redirect("/")
    })
})



module.exports = Router;
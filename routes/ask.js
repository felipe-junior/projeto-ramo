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

    let titleError = req.flash("titleError")
    let descrError = req.flash("descrError")
    titleError = (titleError == undefined || titleError.length == 0) ? undefined : titleError
    descrError = (descrError == undefined || descrError.length == 0) ? undefined : descrError

    let title = req.flash("title")
    let description = req.flash("description")
    title = (title == undefined || title.length == 0) ? "" : title
    description = (description == undefined || description.length == 0) ? "" : description

    Category.findAll().then(categories =>{
        res.render("ask", {categories: categories, session, titleError, descrError, title, description})
    })
})

//Rotas Post
Router.post("/salvarpergunta", askAuth ,async (req, res) =>{
    let t = req.body.title
    let d = req.body.description
    let c = req.body.category
    let user = req.session.user

    //Erros
    let titleError, descrError
    if(t == undefined || t == ""){
        titleError = "O campo de titulo precisa ser preenchido"
    }
    if(d == undefined || d == ""){
        descrError = "O campo de descrição precisa ser preenchido"
    }

    if(titleError != undefined || descrError != undefined){
        req.flash("titleError", titleError)
        req.flash("descrError", descrError)
        req.flash("title", t)
        req.flash("description", d)
        res.redirect("/perguntar")
    }
    else{
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
            slug: slugify(t) + "-"+ id,
            categoryId: c,
            loginId: id
        }).then(() =>{
            const path = slugify(t) + "-"+ id
            res.redirect("/discussao/" + path)
        })
    }

    
})



module.exports = Router;
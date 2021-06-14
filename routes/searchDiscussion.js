const Router = require("express").Router()
const Question = require("../database/models/question")
const Category = require("../database/models/category")
const slugify = require("slugify")
const {Op} = require("sequelize")
const formatDate = require("../public/js/formatDate")

Router.post("/pesquisardiscussao", (req, res)=>{
    let search = req.body.search.trim()
    if(search == ""){
        res.redirect("/")
    }
    else{
        let slug = slugify(search)

        res.redirect("/pesquisa/"+ slug)
    }
    
})

//Rotas Get
Router.get("/pesquisa/:slug", (req,res)=>{
    let session = req.session.user != undefined ? true : false
    const limit = 20
    const offset = 0
    let slug = req.params.slug
    let title = slug.split("-").join(" ")
    Question.findAndCountAll({
        include:[{model: Category}],
        order:[['id', 'DESC']],
        where: {
            title: {
                [Op.like]: '%'+title+'%'
            }
        },
        offset: offset, 
        limit:limit
    }).then(questions =>{
        
        let next
        if(offset + limit >= questions.count){
            next = false
        } else{
            next = true
        }
          
        const result = {
            next: next,
            page: 1,
            date: formatDate
        }
        res.render("searchDiscussion", {questions: questions.rows, title, result, session})
    })
   
})
Router.get("/pesquisa/:slug/page/:id", (req,res)=>{
    let session = req.session.user != undefined ? true : false

    let id = req.params.id
    let slug = req.params.slug
    let title = slug.split("-").join(" ")

    if(id == undefined || id <= 0){
        id = 1
    }
    if(isNaN(id)){
        res.status(404).send("pagina nao encontrada")
        return
    }
    const limit = 20
    const offset = id * limit - limit

    Question.findAndCountAll({
        order:[['id', 'DESC']],
        include:[{model: Category}],
        where: {
            title: {
                [Op.like]: '%'+title+'%'
            }
        },
        offset: offset, 
        limit:limit
    }).then(questions =>{
        let next
        if(offset + limit >= questions.count){
            next= false
          } else{
            next= true
          }
          
          const result = {
            next: next,
            page: parseInt(id),
            date: formatDate
          }
        res.render("searchDiscussion", {questions: questions.rows, title, result, session})
    })
   
})

module.exports = Router

const Category = require("../database/models/category")
const Question = require("../database/models/question")
const formatDate = require("../public/js/formatDate")
const Router = require("express").Router()
const User = require("../database/models/login")

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
    

    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Question}]
    }).then(category =>{
        
    })        
})
module.exports = Router
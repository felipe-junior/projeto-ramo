const Category = require("../database/models/category")
const Question = require("../database/models/question")
const formatDate = require("../public/js/formatDate")
const Router = require("express").Router()


Router.get("/categoria/:slug", async (req, res)=>{
    let session = req.session.user != undefined ? true : false
    const slug = req.params.slug
    
    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Question}]
    }).then(category =>{
        if(category!=undefined){
            res.render("filterByCategory", {discussions: category.questions, formatDate, category, session})
        } else{
            res.redirect("/")
        }
    })        
})
module.exports = Router
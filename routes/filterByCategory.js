const Category = require('../database/models/category')
const Question = require('../database/models/question')
const formatDate = require('../public/js/formatDate')
const router = require('express').Router()


router.get("/categoria/:slug", async (req, res)=>{
    const slug = req.params.slug
    
    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Question}]
    }).then(category =>{
        if(category!=undefined){
            res.render("filterByCategory", {discussions: category.questions, formatDate, category})
        } else{
            res.redirect("/")
        }
    })        
})
module.exports = router
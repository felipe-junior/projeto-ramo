const Category = require('../database/models/categoria')
const Pergunta = require('../database/models/pergunta')
const formatDate = require('../public/js/formataData')
const router = require('express').Router()


router.get('/categoria/:slug', async (req, res)=>{
    const slug = req.params.slug
    
    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Pergunta}],
    }).then(category =>{
        if(category!=undefined){
            
            res.render("filterByCategory", {discussions: category.pergunta, formatDate, category})
        } else{
            res.redirect("/")
        }
    })        
})
module.exports = router
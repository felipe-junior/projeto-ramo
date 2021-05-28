const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")

Router.post("/pesquisardiscussao", (req, res)=>{
    
    if(req.body.search === ''){
        res.redirect("/")
    }
    else{
        let slug = slugify(req.body.search)

        res.redirect("/pesquisa/d/"+ slug)
    }
    
})

Router.get("/pesquisa/d/:slug", (req,res)=>{
    
    let slug = req.params.slug
    let title = slug.split("-").join(" ")
    
    let discussion1 = {
        id: "1",
        title: "Python ou R para Data Science ?",
        category: "Data Science",
        author: "Felipe",
        slug: "Python-ou-R-para-Data-Science-?",
        date: "20/05/2021"
    }
    let discussion2 = {
        id: "2",
        title: "Python ou Javascript para back-end?",
        category: "Web dev",
        author: "Lucas",
        slug: "Python-ou-Javascript-para-back-end?",
        date: "10/05/2021"
    }

    let discussions = [discussion1, discussion2]

    res.render("pesquisa-discussao", {title, discussions})
})

module.exports = Router
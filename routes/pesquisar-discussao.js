const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")
const {Op} = require('sequelize')

//Rota Post
Router.post("/pesquisardiscussao", (req, res)=>{
    
    if(req.body.search === ''){
        res.redirect("/")
    }
    else{
        let slug = slugify(req.body.search)

        res.redirect("/pesquisa/d/"+ slug)
    }
    
})

//Rota Get
Router.get("/pesquisa/d/:slug", (req,res)=>{
    const limit = 20
    const offset = 0
    let slug = req.params.slug
    let title = slug.split("-").join(" ")
    Pergunta.findAll({
        include:[{model: Categoria}],
        where: {
            titulo: {
                [Op.like]: '%'+title+'%'
            }
        },
        offset: offset, 
        limit:limit
    }).then(pergunta =>{
        let next
        if(offset + limit >= pergunta.count){
            next= false
          } else{
            next= true
          }
          
          const result = {
            next: next,
            page: 1
          }
        res.render("pesquisa-discussao", {pergunta, title, result})
    })
   
})

module.exports = Router
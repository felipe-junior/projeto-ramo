const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")
const {Op} = require('sequelize')
const formataData = require("../public/js/formataData")

Router.post("/pesquisardiscussao", (req, res)=>{
    
    if(req.body.search === ''){
        res.redirect("/")
    }
    else{
        let slug = slugify(req.body.search)

        res.redirect("/pesquisa/"+ slug)
    }
    
})

//Rota Get
Router.get("/pesquisa/:slug", (req,res)=>{
    const limit = 20
    const offset = 0
    let slug = req.params.slug
    let title = slug.split("-").join(" ")
    Pergunta.findAndCountAll({
        include:[{model: Categoria}],
        order:[['id', 'DESC']],
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
            next = false
        } else{
            next = true
        }
          
        const result = {
            next: next,
            page: 1,
            data: formataData
        }
        res.render("pesquisa-discussao", {pergunta: pergunta.rows, title, result})
    })
   
})
Router.get("/pesquisa/:slug/page/:id", (req,res)=>{

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

    Pergunta.findAndCountAll({
        order:[['id', 'DESC']],
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
            page: parseInt(id),
            data: formataData
          }
        res.render("pesquisa-discussao", {pergunta: pergunta.rows, title, result})
    })
   
})

module.exports = Router
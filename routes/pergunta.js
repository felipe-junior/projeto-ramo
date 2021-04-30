const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")



Router.get("/", (req, res) =>{
    res.render("pergunta")
})

Router.post("/salvarpergunta", (req, res) =>{
    var t = req.body.title;
    var d = req.body.desc;
    Pergunta.create({
        titulo: t,
        desc: d
    }).then(() =>{
        res.redirect("/")
    })
})



module.exports = Router;
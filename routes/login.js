const Router = require("express").Router()
//const Categories = require("../database/models/")

Router.get("/entrar", (req, res)=>{
    res.render("login")
})

module.exports = Router
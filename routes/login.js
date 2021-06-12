const Router = require("express").Router()
const User = require("../database/models/login")
const bcrypt = require("bcryptjs")
//const Categories = require("../database/models/")

Router.get("/entrar", (req, res)=>{
    let session
    if(req.session.user != undefined){
        session = true
    }
    else{
        session = false
    }
    res.render("login",  {session})
})
Router.post("/entrar", async (req, res)=>{
    
    const {password, email} = req.body
    User.findOne({where: {
        email: email
    }}).then(user =>{
        if(user!=undefined){
            const result = bcrypt.compareSync(password, user.password) 
            if(result){
                req.session.user = user.email
                res.redirect(req.session.returnTo || "/")
            }
        }
    })   
})

Router.get("/sair", (req, res)=>{
    req.session.user = undefined

    res.redirect("/")
})

module.exports = Router
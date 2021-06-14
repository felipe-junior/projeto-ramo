const Router = require("express").Router()
const User = require("../database/models/login")
const bcrypt = require("bcryptjs")
const login = require("../database/models/login")
//const Categories = require("../database/models/")

Router.get("/entrar", (req, res)=>{
    if(req.session.user != undefined){
        res.redirect("/")
    }
    else{
        let session = false
        res.render("login",  {session})
    }
    
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
            else{
                res.redirect("/entrar") 
            }
        }
        else{
            res.redirect("/entrar")
        }
    })   
})

Router.get("/sair", (req, res)=>{
    req.session.user = undefined

    res.redirect("/entrar")
})

//Esqueceu sua senha
Router.get("/esqueceu-sua-senha", async (req, res)=>{
    if(req.session.user != undefined){
        res.redirect("/")
    }
    else{
        let session = false
        let registers = await login.findAll()
        res.render("forgottenPassword", {session, registers}) 
    }
    
})

Router.post("/alterar-senha", (req, res)=>{
    let {email, password} = req.body

    login.findOne({where:{email}}).then(user=>{
        if(user != undefined){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)

            user.update({
                password: hash
            }).then(()=>{
                req.session.user = user.email
                res.redirect("/")
            })
        }
        else{
            res.redirect("/")
        }
    })
})
module.exports = Router
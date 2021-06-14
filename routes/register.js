const Router = require("express").Router()
const Register = require("../database/models/login")
const bcrypt = require("bcryptjs")

Router.get("/cadastrar", (req, res)=>{
    if(req.session.user != undefined){
        res.redirect("/")
    }
    else{
        let session = false
        Register.findAll().then(registers =>{
            res.render("register", {registers, session})
        })
    }
    
})

Router.post("/cadastrar", (req, res) =>{
    let username = req.body.user
    let email = req.body.email
    let password = req.body.password
    
    Register.findOne({
        where:{
            email: email
        }
    }).then(user =>{
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            Register.create({
                username: username,
                email: email,
                password: hash
            }).then(() =>{
                req.session.user = user.email
                res.redirect("/")
            })
        }else{
            res.redirect("/cadastrar")
        }
    })
})
module.exports = Router
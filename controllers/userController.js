const Router = require("express").Router()
const User = require("../models/login")
const bcrypt = require("bcryptjs")

//Página de entrar
Router.get("/entrar", (req, res)=>{
    if(req.session.user != undefined){
        res.redirect("/")
    }
    else{
        let session = false
        res.render("login",  {session})
    }
    
})

//Entrar
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

//Rota de logout
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
        let errorUser = req.flash("errorUser")
        let errorEmail = req.flash("errorEmail")
        let errorPassword = req.flash("errorPassword")
        let username = req.flash("username")
        let email = req.flash("email")
        let password = req.flash("password")
        let confirmPassword = req.flash("confirmPassword")
        
        //Erros
        errorUser = (errorUser == undefined || errorUser.length == 0) ? undefined : errorUser 
        errorEmail = (errorEmail == undefined || errorEmail.length == 0) ? undefined : errorEmail
        errorPassword = (errorPassword == undefined || errorPassword.length == 0) ? undefined : errorPassword

        //Campos dos inputs
        username = (username == undefined || username.length == 0) ? "" : username 
        email = (email == undefined || email.length == 0) ? "" : email 
        password = (password == undefined || password.length == 0) ? "" : password 
        confirmPassword = (confirmPassword == undefined || confirmPassword.length == 0) ? "" : confirmPassword 

        let session = false
        res.render("forgottenPassword", {session, errorUser, errorEmail, errorPassword, username,email,password,confirmPassword}) 
    }
})

//Alterar senha
Router.post("/alterar-senha", async (req, res)=>{
    let {username, email, password, confirmPassword} = req.body
    let errorUser, errorEmail, errorPassword

    let users = await User.findAll()

    //Username
    if(username == undefined || username == ""){
        errorUser = "Os campos não podem ser vazios"
    }
    else{
        let user = users.find(u => u.username == username)

        if(user == undefined){
            errorUser = "Nome de usuário incorreto ou não existe"
        }
    }

    //Email
    if(email == undefined || email == ""){
        errorEmail = "Os campos não podem ser vazios"
    }
    else{
        let user = users.find(u => u.email == email)

        if(user == undefined){
            errorEmail = "E-mail incorreto ou não existe"
        }
    }

    //Same account - username and email
    if(errorUser == undefined && errorEmail == undefined){
        let user = users.find(u => u.username == username)

        if(user.email != email){
            errorEmail = "Conta inválida ou não cadastrada"
        }
    }

    //Password
    if(password == undefined || password == "" || confirmPassword == undefined || confirmPassword == ""){
        errorPassword = "Os campos não podem ser vazios"
    }
    else{
        if(password.length < 8 || confirmPassword.length < 8){
            errorPassword = "A senha deve ter 8 ou mais caracteres"
        }
        else{
            if(password != confirmPassword){
                errorPassword = "As senhas não estão iguais"
            }
        }
    }

    if(errorUser != undefined || errorEmail != undefined || errorPassword != undefined){
        req.flash("errorUser", errorUser)
        req.flash("errorEmail", errorEmail)
        req.flash("errorPassword", errorPassword)
        req.flash("username", username)
        req.flash("email", email)
        req.flash("password", password)
        req.flash("confirmPassword", confirmPassword)
        res.redirect("/esqueceu-sua-senha")
    }
    else{
        User.findOne({where:{email}}).then(u=>{
            if(u != undefined){
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(password, salt)

                u.update({
                    password: hash
                }).then(()=>{
                    req.session.user = u.email
                    res.redirect("/")
                })
            }
            else{
                res.redirect("/esqueceu-sua-senha")
            }
        })
    }
})

//Página de Cadastro
Router.get("/cadastrar", (req, res)=>{
    if(req.session.user != undefined){
        res.redirect("/")
    }
    else{
        let session = false
        User.findAll().then(registers =>{
            res.render("register", {registers, session})
        })
    }
    
})

//Cadastrar usuário
Router.post("/cadastrar", (req, res) =>{
    let username = req.body.user
    let email = req.body.email
    let password = req.body.password
    
    User.findOne({
        where:{
            email: email
        }
    }).then(user =>{
        if(user == undefined){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            User.create({
                username: username,
                email: email,
                password: hash
            }).then(() =>{
                req.session.user = email
                res.redirect("/")
            })
        }else{
            res.redirect("/cadastrar")
        }
    })
})

module.exports = Router
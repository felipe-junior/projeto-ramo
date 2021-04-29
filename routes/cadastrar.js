const Router = require("express").Router({})
const loginTabela = require("../database/models/login")

Router.get("/", (req, res)=>{
    res.render("formTeste")

})

Router.post("/", (req, res) =>{
    const [username, email, senha] = [req.body.username, req.body.email, req.body.senha]
    
    loginTabela.create({
        username: username,
        email: email,
        senha: senha
    })
    .then(()=>{
        res.send("Usuario criado")
        console.log("Usuario criado")
    })
    .catch(err=> {
        console.log(err)
        res.send("Erro inesperado")
    })
})
module.exports = Router
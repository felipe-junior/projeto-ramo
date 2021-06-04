const express = require('express')
const app = express()
const database = require("./database/databaseConfig")
const porta = 8080
const cat_ini = require("./categorias_iniciais")

database.authenticate()
.then(()=> {
    cat_ini()
    console.log("Autenticado")
})
.catch((err)=>console.log("Erro "+ err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))

app.use("/", require("./routes/index")) // A rota index é responsavel por importar todas as rotas

app.listen(porta, ()=>{
    console.log("O servidor está rodando...")
})
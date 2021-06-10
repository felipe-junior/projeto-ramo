const express = require("express")
const app = express()
const database = require("./database/databaseConfig")
const session = require('express-session')
const toMili = require("./public/js/toMili")
const init_cat = require("./initialCategories")
const relations = require('./database/relations')
const port = 8080

database.authenticate()
.then(async ()=> {
    await relations()
    init_cat()
    console.log("Autenticado")
})
.catch((err)=>console.log("Erro "+ err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(session({
    secret: "ashdsayu8gdyu8as",
    cookie: {
        maxAge: toMili(20)
    }
}))

app.use("/", require("./routes/index")) // A rota index é responsavel por importar todas as rotas

app.listen(port, ()=>{
    console.log("O servidor está rodando...")
})
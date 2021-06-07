const express = require("express")
const app = express()
const database = require("./database/databaseConfig")
const port = 8080
const init_cat = require("./initialCategories")

database.authenticate()
.then(()=> {
    init_cat()
    console.log("Autenticado")
})
.catch((err)=>console.log("Erro "+ err))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))

app.use("/", require("./routes/index")) // A rota index é responsavel por importar todas as rotas

app.listen(port, ()=>{
    console.log("O servidor está rodando...")
})
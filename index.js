const express = require('express')
const app = express()
const porta = 3001

app.use(express.urlencoded())
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))

app.use("/", require("./routes/index")) // A rota index é responsavel por importar todas as rotas

app.listen(porta, ()=>{
    console.log("O servidor está rodando...")
})
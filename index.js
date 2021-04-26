const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.render("index")
})

const porta = 3001
app.listen(porta, ()=>{
    console.log("O servidor está rodando...")
})
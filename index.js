const express = require('express')
const app = express()
const porta = 3001

app.set("view engine", "ejs")
app.use(express.static("public"))

app.use("/", require("./routes/index"))

app.listen(porta, ()=>{
    console.log("O servidor está rodando...")
})
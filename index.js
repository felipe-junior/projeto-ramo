const express = require("express")
const app = express()
const database = require("./database/databaseConfig")
const session = require("express-session")
const toMili = require("./public/js/toMili")
const init_cat = require("./initialCategories")
const relations = require("./database/relations")
const flash = require("express-flash")
const cookieParser = require("cookie-parser")
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
app.use(cookieParser("eg1e6h1dj6168v6q8wf68h3c"))
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: toMili(60*60) // 1hr
    }
}))
app.use(flash())

app.use("/", require("./routes/routes")) // A rota index é responsavel por importar todas as rotas

app.listen(port, ()=>{
    console.log("O servidor está rodando...")
})
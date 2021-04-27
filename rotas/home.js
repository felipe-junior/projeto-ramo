const rota = require('express').Router()

rota.get("/home", (req, res)=>{
  res.render("index.ejs")
})

module.exports = rota


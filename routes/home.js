const rota = require('express').Router()

rota.get("/", (req, res)=>{
  res.render("index")
})

module.exports = rota


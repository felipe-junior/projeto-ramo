//Aqui estao as rotas q serao utilizadas

const rotas = require('express').Router()
const home = require('./home')

rotas.use("/", home)
rotas.use("/cadastrar", require("./cadastrar"))
rotas.use("/pergunta", require("./pergunta"))

module.exports = rotas
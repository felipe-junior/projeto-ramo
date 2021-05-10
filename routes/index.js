//Aqui estao as rotas q serao utilizadas

const rotas = require('express').Router()
const home = require('./home')
const pergunta = require('./pergunta')

rotas.use("/", home)
rotas.use("/cadastrar", require("./cadastrar"))
rotas.use("/pergunta", pergunta)

module.exports = rotas
//Aqui estao as rotas q serao utilizadas

const rotas = require('express').Router()
const home = require('./home')
const perguntar = require('./perguntar')
const cadastrar = require("./cadastrar")
rotas.use("/", home)
rotas.use("/", cadastrar)
rotas.use("/", perguntar)

module.exports = rotas
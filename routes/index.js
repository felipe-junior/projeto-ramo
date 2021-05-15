//Aqui estao as rotas q serao utilizadas

const rotas = require('express').Router()
const home = require('./home')
const perguntar = require('./perguntar')
const cadastrar = require("./cadastrar")
const categorias = require('./categorias')
const entrar = require('./entrar')
const discussao = require('./discussao')

rotas.use("/", home)
rotas.use("/", cadastrar)
rotas.use("/", perguntar)
rotas.use("/", categorias)
rotas.use("/", entrar)
rotas.use("/", discussao)

module.exports = rotas
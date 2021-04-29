//Aqui estao as rotas q serao utilizadas

const rotas = require('express').Router()
const home = require('./home')

rotas.use("/", home)

module.exports = rotas
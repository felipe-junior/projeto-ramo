const rotas = require('express').Router()
const home = require('../controllers/home')

rotas.use("/", home)

module.exports = rotas
//Aqui estao as routes q serao utilizadas

const routes = require("express").Router()
const home = require("./home")
const ask = require("./ask")
const register = require("./register")
const categories = require("./categories")
const login = require("./login")
const discussion = require("./discussion")
const searchDiscussion = require("./searchDiscussion")
const filterByCategory = require("./filterByCategory")
const credits = require("./credits")
routes.use("/", home)
routes.use("/", register)
routes.use("/", ask)
routes.use("/", categories)
routes.use("/", login)
routes.use("/", discussion)
routes.use("/", searchDiscussion)
routes.use("/", filterByCategory)
routes.use("/", credits)

module.exports = routes
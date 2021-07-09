const routes = require("express").Router()
const indexController = require("../controllers/indexController")
const userController = require("../controllers/userController")
const questionController = require("../controllers/questionController")
const categoryController = require("../controllers/categoryController")

routes.use("/", indexController)
routes.use("/", userController)
routes.use("/", questionController)
routes.use("/", categoryController)

module.exports = routes
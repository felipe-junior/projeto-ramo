const Router = require("express").Router({})
const Pergunta = require("../database/models/pergunta")
const Categoria = require("../database/models/categoria")
const slugify = require("slugify")

//Rotas Get
Router.get("/discussao/1", (req, res)=>{
    let ask = {
        id: "1",
        title: "Python ou R para Data Science ?",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!",
        author: "Felipe",
        date: "20/05/2021"
    }
    let answers = [
        {
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
            author: "João",
            date: "20/05/2021"
        },
        {
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
            author: "Cleyton",
            date: "21/05/2021"
        },
        {
            text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic adipisci enim, recusandae iure alias nihil repudiandae deserunt natus cum quo! Ea iste eligendi doloribus cumque impedit temporibus consequatur odio facilis!Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
            author: "Lucas",
            date: "22/05/2021"
        },
    ]
    res.render("discussao", {ask, answers})
})

module.exports = Router;
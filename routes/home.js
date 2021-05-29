const rota = require('express').Router()
const teste = require('../teste_cat_ini')

rota.get("/", (req, res)=>{

  let discussion1 = {
    id: "1",
    title: "Python ou R para Data Science ?",
    category: "Data Science",
    author: "Felipe",
    slug: "Python-ou-R-para-Data-Science-?",
    date: "20/05/2021"
  }
  let discussion2 = {
      id: "2",
      title: "Python ou Javascript para back-end?",
      category: "Web dev",
      author: "Lucas",
      slug: "Python-ou-Javascript-para-back-end?",
      date: "10/05/2021"
  }
  let discussion3 = {
    id: "1",
    title: "Python ou R para Data Science ?",
    category: "Data Science",
    author: "Felipe",
    slug: "Python-ou-R-para-Data-Science-?",
    date: "20/05/2021"
  }
  let discussion4 = {
      id: "2",
      title: "Python ou Javascript para back-end?",
      category: "Web dev",
      author: "Lucas",
      slug: "Python-ou-Javascript-para-back-end?",
      date: "10/05/2021"
  }  
  let discussion5 = {
    id: "1",
    title: "Python ou R para Data Science ?",
    category: "Data Science",
    author: "Felipe",
    slug: "Python-ou-R-para-Data-Science-?",
    date: "20/05/2021"
  }
  let discussion6 = {
      id: "2",
      title: "Python ou Javascript para back-end?",
      category: "Web dev",
      author: "Lucas",
      slug: "Python-ou-Javascript-para-back-end?",
      date: "10/05/2021"
  }
  let discussion7 = {
    id: "1",
    title: "Python ou R para Data Science ?",
    category: "Data Science",
    author: "Felipe",
    slug: "Python-ou-R-para-Data-Science-?",
    date: "20/05/2021"
  }
  let discussion8 = {
      id: "2",
      title: "Python ou Javascript para back-end?",
      category: "Web dev",
      author: "Lucas",
      slug: "Python-ou-Javascript-para-back-end?",
      date: "10/05/2021"
  }
  let discussion9 = {
    id: "1",
    title: "Python ou R para Data Science ?",
    category: "Data Science",
    author: "Felipe",
    slug: "Python-ou-R-para-Data-Science-?",
    date: "20/05/2021"
  }
  let discussion10 = {
      id: "2",
      title: "Python ou Javascript para back-end?",
      category: "Web dev",
      author: "Lucas",
      slug: "Python-ou-Javascript-para-back-end?",
      date: "10/05/2021"
  }  

  let discussions = [discussion1, discussion2, discussion3, discussion4, discussion5, discussion6, discussion7, discussion8, discussion9, discussion10]
  
  let result = {
    page: 3,
    next: true
  }
  
  res.render("index", {discussions, result})
  teste() //função pra testar a adição de categorias iniciais, comentado mais sobre no arquivo importado
})

module.exports = rota
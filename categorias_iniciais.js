const rota = require("express")
const Categoria = require("./database/models/categoria")

//Teste que eu tava fazendo para nós adicionarmos categorias "padrões", que já vão ter adicionadas sem precisar do usuário criar uma categoria
//Usei as próprias categorias que já tinham colocado no select do front-end, aparentemente está tudo funcionando, mas deixarei o nome como "teste_cat_ini" por enquanto, caso achemos algum erro, podemos tentar encontrar outra forma de fazer
Categoria.count().then(c =>{
    if(c == 0)
      Categoria.create({
          titulo: "Esporte",
          slug: "Esporte"
      }).then(Categoria.create({
        titulo: "Notícias",
        slug: "Notícias"
    })).then(Categoria.create({
        titulo: "Ciências",
        slug: "Ciências"
    })).then(Categoria.create({
        titulo: "Curiosidades",
        slug: "Curiosidades"
    }))
  })


module.exports = rota;
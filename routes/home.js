const rota = require('express').Router()
const teste = require('../teste_cat_ini')
const Pergunta = require('../database/models/pergunta')
const categoria = require('../database/models/categoria')

// function criar()
// for (let i = 1; i < 1000; i++) {
//   Pergunta.create({titulo: String(i),desc:String(i) , slug: String(i)})      
// }

rota.get("/:id?", async (req, res)=>{
  let id = req.params.id
  if(id==undefined || id<=0){// Caso o usuario nao passe o parametro id
    id=1
  } 
  if(isNaN(id)){
    res.status(404).send("pagina nao encontrada")
    return
  }
  console.log(id)
  const limit = 20
  const offset = id * limit -limit
  
  
  Pergunta.findAndCountAll({offset: offset, limit:limit}).then(perguntas =>{
    let next
    if(offset + limit >= perguntas.count){
      next= false
    } else{
      next= true
    }
    
    const result = {
      next: next,
      page: parseInt(id)
    }
    console.log(perguntas)
    res.render("index", {perguntas: perguntas.rows, result})
  })

  teste() //função pra testar a adição de categorias iniciais, comentado mais sobre no arquivo importado
})




module.exports = rota


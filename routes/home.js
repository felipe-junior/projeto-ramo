const rota = require('express').Router()
const Categoria = require('../database/models/categoria')
const Pergunta = require('../database/models/pergunta')
const categorias_iniciais = require('../categorias_iniciais')

/*rota.get("/", (req, res)=>{
  Pergunta.findAll({
    include: [{model: Categoria}]
  }).then(discussao =>{
    res.render("index", {discussao})
  })
  categorias_iniciais() //função pra testar a adição de categorias iniciais, comentado mais sobre no arquivo importado
})
*/
 function criar(){
  for (let i = 1; i < 1000; i++) 
  Pergunta.create({titulo: String(i),desc:String(i) , slug: String(i), categoria})      
 }
//criar()
rota.get("/", async (req, res)=>{
  const limit = 20
  const offset = 0
   Pergunta.findAndCountAll({offset: offset, limit:limit}).then(discussions =>{
    let next
    if(offset + limit >= discussions.count){
      next= false
    } else{
      next= true
    }
    
    const result = {
      next: next,
      page: 1
    }
    res.render("index", {discussions: discussions.rows, result})
  })
})
rota.get("/page/:id", async (req, res)=>{
  let id = req.params.id
  if(id==undefined || id<=0){// Caso o usuario nao passe o parametro id
    id=1
  } 
  if(isNaN(id)){
    res.status(404).send("pagina nao encontrada")
    return
  }
  const limit = 20
  const offset = id * limit -limit
  
  
  Pergunta.findAndCountAll({offset: offset, limit:limit}).then(discussions =>{
    let next
    if(offset + limit >= discussions.count){
      next= false
    } else{
      next= true
    }
    
    const result = {
      next: next,
      page: parseInt(id)
    }
    res.render("index", {discussions: discussions.rows, result})
  })

  categorias_iniciais() //função pra testar a adição de categorias iniciais, comentado mais sobre no arquivo importado

})




module.exports = rota


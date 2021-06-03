function formataData(data){
    const div = data.split("-")
    const dia = div[2]
    const mes = div[1]
    const ano = div[0]
    const result = dia+"/"+mes+"/"+ano
         
    return result
}

module.exports = formataData
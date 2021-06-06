function formatDate(date){
    const div = date.split("-")
    const day = div[2]
    const month = div[1]
    const year = div[0]
    const result = day+"/"+month+"/"+year
         
    return result
}

module.exports = formatDate
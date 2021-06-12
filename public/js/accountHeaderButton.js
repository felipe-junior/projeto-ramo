function AccountHeader(){
    if(req.session.user != undefined){
        return true
    }
    else{
        return false
    } 
}

module.exports = AccountHeader


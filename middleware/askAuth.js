async function askAuth(req, res, next){
    if(req.session.user!= undefined){
        next()
    } else{
       
        res.redirect("/entrar")
    }
}
module.exports= askAuth
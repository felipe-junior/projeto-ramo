const router = require('express').Router()

router.get("/creditos", (req, res)=>{
    let session = req.session.user != undefined ? true : false

    res.render("credits", {session})
})
module.exports = router
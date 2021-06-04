const Category = require('../database/models/categoria')
const Pergunta = require('../database/models/pergunta')
const formatDate = require('../public/js/formataData')
const router = require('express').Router()


router.get('/categoria/:slug', async (req, res)=>{
    const slug = req.params.slug
    
    Category.findOne({
        where: {
            slug: slug
        }, 
        include: [{model: Pergunta}],
    }).then(category =>{
        if(category!=undefined){
            
            res.render("filterByCategory", {discussions: category.pergunta, formatDate, category})
        } else{
            res.redirect("/")
        }
    })        
})
/*
 <!-- <div class="pagination">
                        
                        
                        <% if(result.page > 2) {%>
                            <a href="/page/<%= result.page - 1 %>"> << anterior</a>
                            <%  }else if(result.page === 2){ %>
                                <a href="/"> << anterior</a>
                                <%  } %>
                                
                                <% if(result.next === true) {%>
                                    <a href="/page/<%= result.page + 1 %>">próximo >></a>
                            <% }%>
                            
                    </div> -->
*/


module.exports = router
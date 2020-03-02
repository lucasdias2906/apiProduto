const express = require("express")
const router = express.Router()

router.get("/", (req,res,next)=>{
    res.status(200).send({
        title:"Produto",
        version:"0.0.1",
        servidor:"ProdutoHost",
        company:"lucassousa"
    })
})

module.exports = router
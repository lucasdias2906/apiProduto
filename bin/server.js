const express = require("express")
const app = require("../app")

const server = express()

server.use(app)
server.listen(3001,function(){
    console.log("Iniciei o servidor no 3001")
})
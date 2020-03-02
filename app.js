const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const router = express.Router()


const indexRoutes = require("./routes/index")
const produtoRoutes = require("./routes/produto")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(cors())

app.use("/",indexRoutes)
app.use("/produto", produtoRoutes)

module.exports = app
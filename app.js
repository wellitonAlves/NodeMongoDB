const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require("./rotes/admin")
const path = require("path")
const app = express()
//const mongoose = require("mongoose")

//configuraçoes:
//body parser
app.use(bodyParser.urlencoded({extends:false}))
app.use(bodyParser.json())

//config TemplateEngine
    app.engine("handlebars", handlebars({defaultLayout:"main"}))
    app.set("view engine", "handlebars")

//public
//app.use(express.static(path.join(__dirname,"public")))   

//rotas
app.use("/admin", admin)





const PORT = 8081
app.listen(PORT,() => { console.log("Servidor rodando!")})
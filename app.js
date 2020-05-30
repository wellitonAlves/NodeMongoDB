const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require("./rotes/admin")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const app = express()
const mongoose = require("mongoose")

//configuraçoes:
//sessao
    app.use(session({
        secret:"podecriarqualquersecret",
        resave: true,
        saveUninitialized:true
    }))
    app.use(flash())
//middleware
app.use((req,res,next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})

//body parser
app.use(bodyParser.urlencoded({extends:false}))
app.use(bodyParser.json())

//config TemplateEngine
    app.engine("handlebars", handlebars({defaultLayout:"main"}))
    app.set("view engine", "handlebars")

//mongo   
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/estudos",{
    useNewUrlParser:true, useUnifiedTopology: true
}).then(
    ()=>{console.log("connectado mongoDB com sucesso")}
).catch((err) =>{
    console.log("Houve um erro"+err)
})

//public
//app.use(express.static(path.join(__dirname,"public")))   

//rotas
app.use("/admin", admin)





const PORT = 8081
app.listen(PORT,() => { console.log("Servidor rodando!")})
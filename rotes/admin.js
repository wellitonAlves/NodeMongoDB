const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")



router.get('/',(req,res) =>{
    res.render("admin/index")
})

router.post('/categorias/nova',(req,res) =>{
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(()=>{
        console.log("Categoria salva com sucesso")
        res.send("categoria salvo com sucesso")
    }).catch((err)=>{
        console.log("Erro ao salvar categoria"+err)
        res.send("Erro ao salvar categoria:"+req)
    })
})

router.get('/posts',(req,res) =>{
    res.send("Página de posts")
})

router.get('/categorias',(req,res) =>{
    res.send("Página de categorias")
})

module.exports = router
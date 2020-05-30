const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")



router.get('/',(req,res) =>{
    res.render("admin/index")
})

router.post('/categorias/nova',(req,res) =>{

    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto:"nome inválido"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto:"slug inválido"})
    }

    if(erros.length > 0){
        res.render(erros)
    }else{

        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(()=>{
            console.log("Categoria salva com sucesso")
            res.send("categoria salvo com sucesso")
        }).catch((err)=>{
            console.log("Erro ao salvar categoria"+err)
        })
    }
})

router.get('/categorias/busca/:id',(req,res) =>{
    Categoria.find({_id:req.params.id}).lean().then((categorias) => {
        res.send({categorias:categorias})
    }).catch((err) => {
        res.send(err)
    })
})
router.post('/categorias/edit',(req,res) =>{

    Categoria.findById(req.body.id).then((categorias) => {
        categorias.nome = req.body.nome
        categorias.slug = req.body.slug

        categorias.save().then(() => {
            res.send("categoria atualizada com sucesso")
        }).catch((err) => {
            res.send(err)
        })
    }).catch((err) => {
        res.send(err)
    })
})

router.post('/categorias/delete',(req,res) =>{

    Categoria.findById(req.body.id).then((categorias) => {
        categorias.remove().then(() => {
            res.send("categoria deletada com sucesso")
        }).catch((err) => {
            console.log("erro"+err)
            res.send(err)
        })
    }).catch((err) => {
        res.send(err)
    })
})

router.get('/categorias',(req,res) =>{
    Categoria.find().lean().then((categorias) => {
        res.send({categorias:categorias})
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router
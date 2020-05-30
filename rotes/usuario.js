const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")
const bcrypt = require("bcryptjs")

router.post('/registro',(req,res) =>{

    Usuario.findOne({email: req.body.email}).then((usuario) =>{
        if(usuario){
            res.send("email ja cadastrado")
        }else{
            const novoUsuario = new Usuario({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            })

            bcrypt.genSalt(10,(erro,salt) =>{
                bcrypt.hash(novoUsuario.senha,salt,(erro,hash) => {
                    if(erro){
                        res.send("erro ao cadastrar usuario")
                    }

                    novoUsuario.senha = hash
                    novoUsuario.save().then(() => {
                        res.send("usuario cadastrado com uscesso")
                    }).catch((err) => {
                        res.send("erro ao cadastrar usuario"+err)
                    })
                })
            })
        }
    }).catch((err) =>{
        res.render("Erro ao cadastrar usuario"+err)
    })
})

module.exports = router
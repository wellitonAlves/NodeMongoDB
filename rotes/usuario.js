const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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


router.post('/login',(req,res) =>{

    Usuario.findOne({email: req.body.email}).then((usuario) =>{
        if(!usuario){
            res.send("usuario nao cadastrado")
        }else{
           bcrypt.compare(req.body.senha, usuario.senha, (err,result) =>{
               if(result){
                   let token = jwt.sign({
                     nome:  usuario.nome,
                     email: usuario.email
                   },"chaveQualquer",
                   {
                       expiresIn:"1h"
                   })
                   res.status(200).send({
                       mensagem:"Autenticação reealizada com sucesso",
                       token: token})
               }else{
                    res.status(401).send({mensagem:"Falha na autenticação "+err})
               }
              

           }) 

        }
    }).catch((err) =>{
        res.render("Erro ao cadastrar usuario"+err)
    })

})

module.exports = router
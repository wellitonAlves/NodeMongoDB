const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/estudos",{
    useNewUrlParser:true, useUnifiedTopology: true
}).then(
    ()=>{console.log("connectado com sucesso")}
).catch((err) =>{
    console.log("Houve um erro"+err)
})

//model usuarios

const UsuariosSchema = mongoose.Schema({
    nome:{
        type: String,
        require: true
    },
    sobrenome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    idade:{
        type: Number,
        required: true
    },
    pais:{
        type: String
    }

})

//collection
mongoose.model('usuario',UsuariosSchema)

const usuarioVitos = mongoose.model("usuario")

new usuarioVitos({
    nome:"Vitor",
    sobrenome:"Lima",
    email:"email@teste.com",
    idade:19,
    pais:"Brasil"
}).save().then(()=>{
    console.log("Usuario criado com sucesso")
}).catch((err) => {
    console.log("Erro ao salvar usuario:"+err)
})
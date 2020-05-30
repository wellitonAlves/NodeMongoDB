const jwt = require("jsonwebtoken")

module.exports = (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, "chaveQualquer")
        req.usuario = decode
        next()
    } catch (error) {
        return res.status(401).send({message: "falha na autenticacao"})
    }
    
}
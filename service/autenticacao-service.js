var jwt = require('jsonwebtoken')
const acessoService = require("../service/acesso-service")
const AcessoModel = require('../model/Acesso')

module.exports = {
    login: async function(email, senha) {
        var acessoRespose = await acessoService.getAcessoByEmail(email)
        if (acessoRespose instanceof AcessoModel) {
            if (acessoRespose.senha === senha) {
                let token = jwt.sign({codigoLogado: acessoRespose.codigo}, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })
                return ({status: 200, data: token})
            } else {
                return {status: 400, data: "Senha incorreta"}
            }
        } else {
            return {status: 404, data: "Esse usuário não existe"}
        }
    }
}
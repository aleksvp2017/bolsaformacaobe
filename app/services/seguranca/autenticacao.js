const chalk = require('chalk')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})
const Usuarios = require('../usuario/usuarios.js')




const login = async function (req, res, next) {
    console.log("Fazendo login")
    if (!req.body.usuario || !req.body.usuario.email || !req.body.senha){
        res.status(401).json({ error: 'Dados para autenticação não encontrados na requisição'})
        return
    }


    var usuario = await Usuarios.validar(req.body.usuario.email, req.body.usuario.senha)
    console.log("Validado")
    if (usuario != null) {
        if (!usuario.snativo){
            res.status(401).json({ error: 'Usuário não ativo, por gentileza, aguarde a ativação.' })
            return
        }
        /*var jwt = require('jsonwebtoken')
        let token = jwt.sign({
            name: usuario.nome,
            email: usuario.email
        }, process.env.SECRET, {
            expiresIn: 86400 //24h
        })
        var menu = await Permissao.obterMenu(usuario.email)*/
        res.status(200).json({ auth: true, usuario: { ...usuario, senha: '', token: token, menu: menu }})
        //Auditoria.log(usuario.email, 'usuario.login', usuario.email, null)
        next()
    }
    else {
        let msgErro = 'E-mail ou senha incorretos'
        res.status(401).json({ error: msgErro })
        //Auditoria.log(usuario.email, 'usuario.login', usuario.email, msgErro)
    }
}

module.exports = {
    login
}
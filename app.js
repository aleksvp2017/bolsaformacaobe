var express = require('express') //servidor http
var app = express()

//necessario para evitar o erro cors acessando localhost
var cors = require('cors')
app.use(cors())

var bearerToken = require('express-bearer-token')
app.use(bearerToken())
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


//Middleware para checar existência do token e autorização a cada requisição
var Permissao = require('./app/services/seguranca/permissao.js')
app.use(Permissao.verificaToken)
app.use(Permissao.autorizacao)


var Rotas = require('./app/routes/routes.js')
//Monta rotas
Rotas.routes.map(rota => {
    //caso de upload de arquivos, por exemplo
    if (rota.outroMiddleware){
        app[rota.metodohttp](rota.uri, rota.outroMiddleware, rota.componente[rota.metodo])
    }
    else{
        app[rota.metodohttp](rota.uri, rota.componente[rota.metodo])
    }
})





app.listen(process.env.PORT, () => { console.log('Server up and listening at ' + process.env.PORT)})
var express = require('express') //servidor http
var app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

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
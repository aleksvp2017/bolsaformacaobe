const Autenticacao = require('../services/seguranca/autenticacao.js')
const Helper = require('../services/helper/helper.js')

var routes = [
    //nome do componente tem que bater com o nome do recurso 
    //USUARIOS
    { uri: '/login', metodohttp: 'post', componente: Autenticacao,  metodo: 'login', requerAutenticacao: false},
];

function isRotaRequerAutenticacao(uri, metodohttp) {
    var rota = obterRota(uri, metodohttp)
    return rota.requerAutenticacao
}

function obterRota(uri, metodohttp) {
    console.log('Chegou aqui:', uri)
    var rota = {}
    routes.map(route => {
        let uriExp = new RegExp(route.uri)
        console.log('uriExp:', uriExp)
        if (uriExp.test(uri) && Helper.isIguais(route.metodohttp,metodohttp)){
            console.log('Achou a rota:', route)
            rota = route
        }
    })
    console.log('Rota:', rota)
    return rota
}

module.exports = {
    routes, isRotaRequerAutenticacao, obterRota
}

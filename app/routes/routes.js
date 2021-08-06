const Autenticacao = require('../services/seguranca/autenticacao.js')
const Auditoria = require('../services/auditoria/auditoria.js')
const Helper = require('../services/helper/helper.js')
const Usuario = require('../services/usuario/usuarios.js')
const Permissao = require('../services/seguranca/permissao.js')
const Carga = require('../services/carga/carga.js')

var routes = [
    //nome do componente tem que bater com o nome do recurso 
    //Autenticacao
    { uri: '/login', metodohttp: 'post', componente: Autenticacao,  metodo: 'login', requerAutenticacao: false},
    //MENU
    { uri: '/menu', metodohttp: 'get', componente: Permissao,  metodo: 'menu', requerAutenticacao: true},
    //USUARIOS
    { uri: '/usuarios', metodohttp: 'post', componente: Usuario, metodo: 'registrar', requerAutenticacao: false},
    { uri: '/usuarios/incluir', metodohttp: 'post', componente: Usuario, metodo: 'incluir', requerAutenticacao: true},
    { uri: '/recuperarSenha', metodohttp: 'post', componente: Usuario, metodo: 'recuperarSenha', requerAutenticacao: false},
    { uri: '/usuarios/:[0-9]+', metodohttp: 'post', componente: Usuario, metodo: 'alterar', requerAutenticacao: true},
    { uri: '/usuarios', metodohttp: 'delete', componente: Usuario, metodo: 'excluir', requerAutenticacao: true},
    { uri: '/alterarSenha', metodohttp: 'post', componente: Usuario, metodo: 'alterarSenha', requerAutenticacao: true},
    { uri: '/usuarios', metodohttp: 'get', componente: Usuario, metodo: 'listar', requerAutenticacao: true},    
    //AUDITORIA
    { uri: '/auditoria', metodohttp: 'get', componente: Auditoria, metodo: 'listar', requerAutenticacao: true},
    //CARGA
    { uri: '/carga', metodohttp: 'post', componente: Carga, metodo: 'iniciar', requerAutenticacao: true},
    { uri: '/carga/etapasRealizadas', metodohttp: 'post', componente: Carga, metodo: 'listar', requerAutenticacao: true},
    { uri: '/carga/etapas', metodohttp: 'get', componente: Carga, metodo: 'listarEtapas', requerAutenticacao: true}
];

function isRotaRequerAutenticacao(uri, metodohttp) {
    var rota = obterRota(uri, metodohttp)
    return rota.requerAutenticacao
}

function obterRota(uri, metodohttp) {
    //console.log('Chegou aqui:', uri)
    var rota = {}
    routes.map(route => {
        let uriExp = new RegExp(route.uri)
        //console.log('uriExp:', uriExp)
        if (uriExp.test(uri) && Helper.isIguais(route.metodohttp,metodohttp)){
            console.log('Achou a rota:', route)
            rota = route
        }
    })
    //console.log('Rota:', rota)
    return rota
}

module.exports = {
    routes, isRotaRequerAutenticacao, obterRota
}

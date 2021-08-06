const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})
var Auditoria = require('../auditoria/auditoria.js')

const iniciar = (req, res, next) => {
    try{
        var etapasAAtualizar = req.body.etapasAAtualizar
        pool.query('call paineldaf.atualizaDadosPainel($1)', [etapasAAtualizar])   
        res.status(200).json( {mensagem: 'Processo de carga iniciado...'})             
        Auditoria.log(req.app.usuario, 'carga.atualizar', req.app.usuario, null)            
    }
    catch (error){
        //res.status(401).json({error: `Problema ao iniciar carga ${error}`})
        Auditoria.log(req.app.usuario, 'carga.iniciar', req.app.usuario, error)            
    }
}

const listar = async function (req, res, next) {
    try{     
        var etapasRealizadas = await buscar(req.body.apenasMaisRecente)
        res.status(200).json( {etapasRealizadas: etapasRealizadas})
    }
    catch(error){
        res.status(401).json({error: `Error ao buscar etapas realizadas ${error}`})
    }
}

const buscar = async (apenasMaisRecente) => {
    try{
        var sql = `select a.codigo, to_char(datahora, 'HH24:MI:SS DD/MM/YYYY') as datahora, descricao, erro from paineldaf.atualizacaodados a 
                    inner join paineldaf.etapacarga e on e.codigo = a.etapacodigo `
        if (apenasMaisRecente){
            sql += ` where a.codigo = (select max(codigo) from paineldaf.atualizacaodados)`
        }                    
        var dadosAtualizados = await (await pool.query(sql)).rows
        return dadosAtualizados
    }
    catch(error){
        console.log(chalk.red('Problema ao buscar usuarios: ', error))
        throw 'Problema ao buscar etapas atualizadas: ' + error
    }
}

const listarEtapas = async (req, res, next) => {
    try{
        var sql = `select * from paineldaf.etapacarga`
        var etapas = await (await pool.query(sql)).rows
        res.status(200).json( {etapas: etapas})
    }
    catch(error){
        res.status(401).json({error: `Error ao buscar etapas  ${error}`})
    }
}

module.exports = {
    iniciar, listar, listarEtapas
}
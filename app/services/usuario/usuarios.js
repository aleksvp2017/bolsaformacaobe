const chalk = require('chalk')
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})


const buscar = async (filtro) => {
    var usuarios = null
    try{
        var sql = 'select * from painel.usuario where true = true '
        if (filtro){
            if (filtro.email){
                sql += ' and email = \'' + filtro.email + '\''
            }
            if (filtro.id){
                sql += ' and usuarioid = ' + filtro.usuarioid
            }
            if (filtro.senha){
                sql += ' and senha = \'' + filtro.senha + '\''
            }
        }
        console.log('Vai buscar usuario, pool', pool)
        var usuarios = await (await pool.query(sql)).rows
        console.log(usuarios)
        return usuarios
    }
    catch(error){
        console.log(chalk.red('Problema ao buscar usuarios: ', error))
        throw 'Problema ao buscar usuarios: ' + error
    }
}

const validar = async (email, senha) => {
    var usuarioValido = null
    try{
        let usuarios = await buscar({email:email, senha: senha})
        if (usuarios){
            usuarioValido = usuarios[0]
        }
        return usuarioValido
    }
    catch(error){
        console.log(chalk.red('Problema ao validar usuário: ', error))
        throw 'Problema ao validar usuário: ' + error
    }
}

module.exports = {
    validar
}
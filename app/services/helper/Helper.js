function isIguais(texto1, texto2){
    //console.log('Texto1:',texto1, ' Texto2:', texto2)
    texto1 = texto1.replace(/ /g, '')
    texto2 = texto2.replace(/ /g, '')
    var parsedTexto1 = ''
    if (texto1){
        parsedTexto1 = texto1.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    }
    var parsedTexto2 = ''
    if (texto2){
        parsedTexto2 = texto2.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
    }
    // console.log(chalk.green(parsedTexto1, ' é igual a ', parsedTexto2))
    return parsedTexto1 === parsedTexto2
}  


module.exports = {
    isIguais
  };
const Usuario = require('../models/usuario')
const Mensaje = require('../models/mensaje.model')

const usuarioConectado = async ( uid = '' ) => {

    const usuario = await Usuario.findById( uid )
    usuario.online = true

    //almacenar en la BD
    await usuario.save()
    return usuario
}

const usuarioDesconectado = async ( uid = '' ) => {

    const usuario = await Usuario.findById( uid )
    usuario.online = false

    //almacenar en la BD
    await usuario.save()
    return usuario
}

const grabarMensaje = async( payload ) => {
    /*
        payload {
            origen  : '',
            destino : '',
            texto   : ''
        }
    */
    try {
        const mensaje = new Mensaje( payload )
        await mensaje.save()

        return true
    } catch(error){
        return false
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}
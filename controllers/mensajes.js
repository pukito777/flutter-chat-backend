const { response } = require('express')
const Mensaje = require('../models/mensaje.model')

const obtenerChat = async(req, res) => {
    const miId = req.uid
    const mensajesOrigen = req.params.origen

    const last30 = await Mensaje.find({
        $or: [{origen: miId, destino: mensajesOrigen}, {origen: mensajesOrigen, destino: miId}]
    }).sort({createdAt: 'desc'}).limit(30)

    res.json({
        ok: true,
        mensajes: last30,
        msg: 'hola mensajes'
    })

}

module.exports = {
    obtenerChat
}


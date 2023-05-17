const { io } = require('../index')
const { comprobarJWT } = require('../helpers/jwt')
const {usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket')

// Mensajes de Sockets
io.on('connection', (client) => {
    
    console.log('Cliente conectado')
    //console.log(client.handshake.headers['x-token'])    
    const [ valido, uid] = comprobarJWT(client.handshake.headers['x-token'])

    //console.log(valido, uid)

    //Verificar autenticación
    if (!valido) { return client.disconnect() }

    //console.log('cliente autenticado')

    //Cliente autenticado
    usuarioConectado( uid )

    //Ingresar al usuario a una sala
    //sala global(io.emit), client.id(mensaje privado)
    
    //sala privada
    client.join( uid )
        
    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async( payload ) => {
        //TODO: Guardar mensaje
        await grabarMensaje( payload )
        io.to(payload.destino).emit('mensaje-personal', payload)
    })

    

    client.on('disconnect', () => {
        //console.log('Cliente desconectado')
        usuarioDesconectado( uid )
    })

/*
//io.emite a todos
    client.on('mensaje', () => {
        console.log('Mensaje', payload)
        io.emit('mensaje', {admin: 'Nuevo mensaje'})

    })
*/
    
})

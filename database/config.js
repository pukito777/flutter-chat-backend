const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        /*
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlPaser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        */
       
        await mongoose.connect(process.env.DB_CNN, {
            
        })

        console.log('DB Online')

    } catch(error){
        console.log(error)
        throw new Error('Error en la base de datos - Comuniquesé con el administrador')
    }
}

module.exports = {
    dbConnection
}
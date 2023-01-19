//console.log('hello word');
import express from 'express'
import employeesRoutes from './src/routes/employees.routes.js'
import {PORT} from './src/config.js'

const app = express()

//convertimos a json los datos de las consultas 
app.use(express.json())
app.use(employeesRoutes)
//respuesta en caso de no encontrar una ruta en el navegador
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})
//iniciamos servidor en puerto 3000 (variable de entorno) - localhost:3000
app.listen(PORT)

console.log(`app corriendo en puerto ${PORT}`);


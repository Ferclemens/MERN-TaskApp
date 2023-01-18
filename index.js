//console.log('hello word');
import express from 'express'
import employeesRoutes from './src/routes/employees.routes.js'

const app = express()

//convertimos a json los datos de las consultas 
app.use(express.json())
app.use(employeesRoutes)
//iniciamos servidor en puerto 3000 (localhost:3000)
app.listen(3000)

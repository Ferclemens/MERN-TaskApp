//console.log('hello word');
import express from 'express'
import employeesRoutes from './src/routes/employees.routes.js'

const app = express()

//convertimos en json a los datos de las consultas 
app.use(express.json())

app.use(employeesRoutes)


app.listen(3000)

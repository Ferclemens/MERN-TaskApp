import {pool} from '../../db.js'

export const getEmployees = (req, res) => {res.send('obteniendo empleados')}

//siempre la comunicacion con la db es asincrona
export const postEmployee = async (req, res) => {
    const {name, salary} = req.body
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)',[name, salary])
    console.log('post success');
    console.log(req.body)
    res.send({
        id: rows.insertId,
        name,
        salary,
      });
}

export const putEmployee = (req, res) => {res.send('modificando empleado')}

export const deleteEmployee = (req, res) => {res.send('eliminando empleado')}
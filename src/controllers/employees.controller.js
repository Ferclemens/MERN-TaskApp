import {pool} from '../../db.js'

//siempre la comunicacion con la db es asincrona
export const getEmployees = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM employee')
    res.json(rows)
}

export const getEmployee = async (req, res) => {
    // guardamos las rows (filas) de la tabla, ya que son los datos que buscamos (si traemos toda la info tambien tenemos los buffers que no nos interesan)
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
    //buscamos 1 resultado, por eso el indice siempre va a ser 0
    res.json(rows[0])
}

export const postEmployee = async (req, res) => {
    //guardamos en variable el name y salary del request body (destructuración)
    const {name, salary} = req.body
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)',[name, salary])
    console.log('post success');
    //console.log(req.body)
    res.send({
        id: rows.insertId,
        name,
        salary,
      });
}

export const putEmployee = async (req, res) => {
    const {id} = req.params
    const {name, salary} = req.body
    //IFNULL() -> nos permite modificar un solo dato del asiento. ejemplo name o salary. Sin esto debemos modificar todos los datos del asiento o sino la db lo completa con "null".
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',[name, salary, id])
    //condicional si no se modifica empleado
    if(result.affectedRows === 0 ) return res.status(404).json({
        message: 'employee not found / not modified'
    })
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    console.log(result);
    res.json(rows[0])
}

export const deleteEmployee = async (req, res) => {
    //del arreglo que nos devuelve nos interesa el result solamente
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?',[req.params.id])
    //condicional para manejo de acción (delete) sin resultado 
    if(result.affectedRows <= 0){
        return res.status(404).json({
            message: 'employee not found'
        })
    }
    res.sendStatus(204)
    console.log(result);
}
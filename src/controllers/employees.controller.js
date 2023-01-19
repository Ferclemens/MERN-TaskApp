import {pool} from '../db.js'

//siempre la comunicacion con la db es asincrona
export const getEmployees = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM employee')
        res.json(rows)   
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getEmployee = async (req, res) => {
    try {
        // guardamos las rows (filas) de la tabla, ya que son los datos que buscamos (si traemos toda la info tambien tenemos los buffers que no nos interesan)
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
        //condicional si no se encuentra empleado
        if(rows[0] === undefined) return res.status(404).json({
            message:'employee not found'
        })        
        //buscamos 1 resultado, por eso el indice siempre va a ser 0
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const postEmployee = async (req, res) => {
    const {name, surname, position, salary} = req.body
    try {
        //guardamos en variable el name y salary del request body (destructuración)
        const [rows] = await pool.query('INSERT INTO employee (name, surname, position, salary) VALUES (?,?,?,?)',[name, surname, position, salary])
        console.log('post success');
        //console.log(req.body)
        res.send({
            id: rows.insertId,
            name,
            surname,
            position,
            salary,
        })  
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const putEmployee = async (req, res) => {
    const {id} = req.params
    const {name, surname, position, salary} = req.body
    try {
        //IFNULL() -> nos permite modificar un solo dato del asiento. ejemplo name o salary. Sin esto debemos modificar todos los datos del asiento o sino la db lo completa con "null".
        const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), surname = IFNULL(?, surname), position = IFNULL(?, position), salary = IFNULL(?, salary) WHERE id = ?',[name, surname, position, salary, id])
        //condicional si no se modifica empleado
        if(result.affectedRows === 0 ) return res.status(404).json({
        message: 'employee not found / not modified'
    })
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    console.log(result);
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
import { Router } from "express";
import { getEmployees, postEmployee, putEmployee, deleteEmployee } from "../controllers/employees.controller.js";

const router = Router()

router.get('/employees', getEmployees)
router.post('/employees', postEmployee)
router.put('/employees', putEmployee)
router.delete('/employees', deleteEmployee)

export default router